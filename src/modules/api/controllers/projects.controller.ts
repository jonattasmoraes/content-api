import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProjectsService } from '../services/projects.service';
import { ProjectsDTO } from '../dto/projects.dto';

@Controller('api/project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  async create(@Body() data: ProjectsDTO) {
    return this.projectsService.create(data);
  }

  @Get('')
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':projectId')
  async findOne(@Param('projectId') projectId: number) {
    return this.projectsService.findOne(projectId);
  }

  @Put(':projectId')
  async update(
    @Param('projectId') projectId: number,
    @Body() data: ProjectsDTO,
  ) {
    return this.projectsService.update(projectId, data);
  }

  @Delete(':projectId')
  async delete(@Param('projectId') projectId: number) {
    return this.projectsService.delete(projectId);
  }
}
