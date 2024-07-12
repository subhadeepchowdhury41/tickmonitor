import { Attatchment } from 'src/attatchments/entities/attatchment.entity';
import { Task, Urgency } from '../entity/tasks.entity';
import { Comment } from 'src/comments/entities/comment.entity';

export class CreateTaskDto {
  title: string;
  description: string;
  dueDate: Date;
  urgency: Urgency;
  assignedBy: string;
  assignedUsers: string[];
  attatchments: (string | Attatchment)[];
  subTasks: (string | Task)[];
  dependencies: (string | Task)[];
  comments: (string | Comment)[];
  parentTaskId?: string;
  dependencyOf?: string;
}
