import { Urgency } from '../entity/tasks.entity';
import { IsArray, IsDate, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  urgency?: Urgency;

  @IsNotEmpty()
  assignedBy: string;

  @IsArray()
  assignedUsers: string[];

  @IsArray()
  vertices: string[];

  @IsDate()
  dueDate: Date;

  @IsDate()
  startDate: Date;

  parentTaskId?: string;
  dependencyOf?: string;
}
