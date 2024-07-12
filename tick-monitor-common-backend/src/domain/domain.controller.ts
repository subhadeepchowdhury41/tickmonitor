import { Body, Controller, Post } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}
  @Post()
  create(@Body() body: CreateDomainDto) {
    return this.domainService.create(body);
  }
}
