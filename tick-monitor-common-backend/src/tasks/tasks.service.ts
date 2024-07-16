import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { AttatchmentsService } from 'src/attatchments/attatchments.service';
import { VerticesService } from 'src/vertices/vertices.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => CommentsService))
    private readonly commentService: CommentsService,
    @Inject(forwardRef(() => AttatchmentsService))
    private readonly attatchmentService: AttatchmentsService,
    @Inject(forwardRef(() => VerticesService))
    private readonly vertexService: VerticesService,
  ) {}

  findById = async (id: string): Promise<Task> => {
    return this.tasksRepository.findOne({ where: { id: id } });
  };

  fetchTaskDetails = async (id: string) => {
    return this.tasksRepository.findOne({
      where: { id: id },
      relations: [
        'subTasks',
        'dependencies',
        'comments',
        'attatchments',
        'assignedUsers',
        'domains',
        'logs',
      ],
    });
  };

  findAll = async (userId?: string) => {
    if (!userId) {
      return await this.tasksRepository.find();
    }
    const assigned = await this.tasksRepository.find({
      where: { assignedUsers: { id: userId } },
      relationLoadStrategy: 'join',
      relations: ['assignedUsers', 'subTasks', 'dependencies'],
    });
    const assigns = await this.tasksRepository.find({
      where: { assignedBy: { id: userId } },
      relations: ['assignedUsers', 'subTasks', 'dependencies'],
    });
    return { assigns, assigned };
  };

  create = async (createTaskDto: CreateTaskDto) => {
    const { assignedUsers, dependencyOf, vertices, parentTaskId } =
      createTaskDto;
    const initTask = this.tasksRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate: createTaskDto.dueDate,
      subTasks: [],
      assignedUsers: [],
      vertices: [],
      urgency: createTaskDto.urgency,
    });
    if (parentTaskId) {
      const parentTask = await this.findById(parentTaskId);
      initTask.parentTask = parentTask;
      initTask.level = parentTask.level + 1;
    }
    if (dependencyOf) {
      const dependencyOfTask = await this.findById(dependencyOf);
      initTask.dependencyOf = dependencyOfTask;
    }
    const assignerUser = await this.usersService.checkValidUser(
      createTaskDto.assignedBy,
    );
    initTask.assignedBy = assignerUser;
    assignedUsers?.forEach(async (user) => {
      const fetchedUser = await this.usersService.checkValidUser(user);
      initTask.assignedUsers.push(fetchedUser);
    });
    vertices?.forEach(async (vertex) => {
      const fetchedVertex = await this.vertexService.findById(vertex);
      initTask.vertices.push(fetchedVertex);
    });
    return await this.tasksRepository.save(initTask);
  };
}
