import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { VerticesService } from './vertices.service';
import { CreateVertexDto } from './dto/create-vertex.dto';

@Controller('vertices')
export class VerticesController {
  constructor(private readonly verticesService: VerticesService) {}

  @Get(":id")
  list(@Param("id") userId: string) {
    return this.verticesService.listAll(userId);
  }

  @Post()
  create(@Body() createVertexDto: CreateVertexDto) {
    return this.verticesService.create(createVertexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verticesService.remove(id);
  }
}
