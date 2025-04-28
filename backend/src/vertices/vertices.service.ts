import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVertexDto } from './dto/create-vertex.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vertex } from './entities/vertex.entity';
import { Repository } from 'typeorm';
import { DomainService } from 'src/domain/domain.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class VerticesService {
  constructor(
    @InjectRepository(Vertex)
    private readonly verticesRepo: Repository<Vertex>,
    @Inject(forwardRef(() => DomainService))
    private readonly domainService: DomainService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}
  listAll = async (userId: string) => {
    const user = await this.usersRepo.findOne({
      where: {
        id: userId
      },
      relations: ["vertices"]
    });
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user.vertices;
  }
  findById = async (id: string) => {
    return await this.verticesRepo.findOne({ where: { id: id } });
  };
  create = async (createVertexDto: CreateVertexDto) => {
    try {
      const existingVertex = await this.verticesRepo.findOne({
        where: { name: createVertexDto.name },
      });
      if (existingVertex) {
        throw new BadRequestException('Vertex already exists');
      }
      const createdVertex = this.verticesRepo.create({
        name: createVertexDto.name,
        people: createVertexDto?.people?.map(id => ({id})),
        domain: {
          id: createVertexDto.domainId
        },
        ...(createVertexDto?.parentVertical && {
          parentVertex: {
            id: createVertexDto.parentVertical
          }
        })
      });
      const vertex = await this.verticesRepo.save(createdVertex);
      return vertex;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  remove = async (id: string) => {
    const queriedVertext = await this.findById(id);
    if (!queriedVertext) {
      throw new NotFoundException('No Vertex Found!');
    }
    await this.verticesRepo.remove(queriedVertext);
    return { message: 'Domain Removed Successfully' };
  };
}
