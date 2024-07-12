import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Domain } from './entities/domain.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { VerticesService } from 'src/vertices/vertices.service';
import { CreateDomainDto } from './dto/create-domain.dto';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    @Inject(forwardRef(() => RolesService))
    private readonly rolesSerice: RolesService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @Inject(forwardRef(() => VerticesService))
    private readonly verticesService: VerticesService,
  ) {}
  create = async (createDomainDto: CreateDomainDto) => {
    try {
      const domain = this.domainRepository.create(createDomainDto);
      return await this.domainRepository.save(domain);
    } catch (err) {
      console.error(err);
      return err;
    }
  };
  addVerticesToDomain = async (domainId: string, vertId: string) => {
    try {
      const queriedVertex = await this.verticesService.findById(vertId);
      const queriedDomain = await this.findById(domainId);
      queriedDomain.vertices.push(queriedVertex);
      return await this.domainRepository.save(queriedDomain);
    } catch (err) {
      console.error(err);
    }
  };
  findById = async (id: string) => {
    return await this.domainRepository.findOne({ where: { id: id } });
  };
  findAll = async () => {};
}
