import { Role } from 'src/roles/entity/roles.entity';
import { User } from 'src/users/entities/user.entity';
import { Vertex } from 'src/vertices/entities/vertex.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  domainUrl: string;

  @Column('json')
  details: object;

  @OneToMany(() => Domain, (domains) => domains.parentDomain)
  subDomains: Domain[];

  @ManyToOne(() => Domain, (domain) => domain.subDomains)
  parentDomain: Domain;

  @Column({ default: 0 })
  level: number;

  @Column()
  domainId: string;

  @Column()
  domainName: string;

  @OneToMany(() => Role, (roles) => roles.domain)
  roles: Role[];

  @ManyToOne(() => User, (user) => user.domains)
  user: User;

  @OneToMany(() => Vertex, (vertex) => vertex.domain)
  vertices: Vertex[];
}
