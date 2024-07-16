import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { DomainService } from './domain.service';

@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}
  @Post()
  create(@Body() body: CreateDomainDto) {
    return this.domainService.create(body);
  }

  @Get()
  getAll() {
    return this.domainService.findAll();
  }
}
