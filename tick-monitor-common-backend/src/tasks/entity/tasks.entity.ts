import { Attatchment } from 'src/attatchments/entities/attatchment.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Tasklog } from 'src/tasklog/entities/tasklog.entity';
import { User } from 'src/users/entities/user.entity';
import { Vertex } from 'src/vertices/entities/vertex.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Urgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: 0 })
  level: number;

  @Column({
    type: 'enum',
    enum: Urgency,
    default: Urgency.LOW,
  })
  urgency: Urgency;

  @ManyToOne(() => Task, (task) => task.subTasks, { nullable: true })
  parentTask: Task;

  @OneToMany(() => Task, (task) => task.parentTask, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  subTasks: Task[];

  @ManyToMany(() => User, (user) => user.assignedTasks)
  @JoinTable({
    name: 'task_users',
    joinColumn: { name: 'taskId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  assignedUsers: User[];

  @ManyToOne(() => User, (user) => user.assignedTasks)
  assignedBy: User;

  @OneToMany(() => Task, (task) => task.dependencyOf, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  dependencies: Task[];

  @ManyToOne(() => Task, (task) => task.dependencies)
  dependencyOf: Task;

  @OneToMany(() => Comment, (comment) => comment.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Attatchment, (attachment) => attachment.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  attachments: Attatchment[];

  @OneToMany(() => Tasklog, (log) => log.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  logs: Tasklog[];

  @OneToMany(() => Vertex, (vertices) => vertices.task)
  vertices: Vertex[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
