import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { AttatchmentsService } from 'src/attatchments/attatchments.service';

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
    const {
      subTasks,
      dependencies,
      assignedUsers,
      comments,
      attatchments,
      dependencyOf,
      parentTaskId,
    } = createTaskDto;
    const task = new Task();
    await this.tasksRepository.save(task);
    subTasks?.forEach(async (subTask) => {
      if (typeof subTask === 'string') {
        const fetchedSubTask = await this.tasksRepository.findOne({
          where: { id: subTask },
        });
        task.subTasks.push(fetchedSubTask);
      } else {
        const createdSubTask = this.tasksRepository.create(subTask);
        await this.tasksRepository.save(createdSubTask);
        task.subTasks.push(createdSubTask);
      }
    });
    dependencies?.forEach(async (depTask) => {
      if (typeof depTask === 'string') {
        const fetchedSubTask = await this.tasksRepository.findOne({
          where: { id: depTask },
        });
        task.dependencies.push(fetchedSubTask);
      } else {
        const createdDepTask = this.tasksRepository.create(depTask);
        await this.tasksRepository.save(createdDepTask);
        task.dependencies.push(createdDepTask);
      }
    });
    if (parentTaskId) {
      const parentTask = await this.findById(parentTaskId);
      task.parentTask = parentTask;
      task.level = parentTask.level + 1;
    }
    if (dependencyOf) {
      const dependencyOfTask = await this.findById(dependencyOf);
      task.dependencyOf = dependencyOfTask;
    }
    const assignerUser = await this.usersService.findById(
      createTaskDto.assignedBy,
    );
    task.assignedBy = assignerUser;
    assignedUsers.forEach(async (user) => {
      const fetchedUser = await this.usersService.findById(user);
      task.assignedUsers.push(fetchedUser);
    });
    attatchments?.forEach(async (attatchment) => {
      if (typeof attatchment === 'string') {
        const mutatedAttatchments =
          await this.attatchmentService.findById(attatchment);
        task.attachments.push(mutatedAttatchments);
      }
    });
    comments?.forEach(async (comment) => {
      if (typeof comment === 'string') {
        const mutatedComment = await this.commentService.findById(comment);
        task.comments.push(mutatedComment);
      }
    });
    task.urgency = createTaskDto.urgency;
    task.dueDate = createTaskDto.dueDate;
    await this.tasksRepository.update(task.id, task);
  };
}
