import { Domain } from 'src/domain/entities/domain.entity';
import { Task } from 'src/tasks/entity/tasks.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vertex {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  level: number;

  @ManyToOne(() => Vertex, (vertex) => vertex.childVertices)
  parentVertex: Vertex;

  @OneToMany(() => Vertex, (vertex) => vertex.parentVertex)
  childVertices: Vertex[];

  @ManyToOne(() => Task, (task) => task.vertices)
  task: Task;

  @ManyToMany(() => User, (user) => user.vertices)
  @JoinTable({
    name: 'vertex_user',
    joinColumn: {
      name: 'vertex_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  people: User[];

  @ManyToOne(() => Domain, (domain) => domain.vertices)
  domain: Domain;
}
