import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.taskService.fetchTaskDetails(id);
  }

  @Get()
  async find(@Query('userId') userId?: string) {
    return this.taskService.findAll(userId);
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }
}
