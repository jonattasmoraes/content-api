import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../database/PrismaService';
import { ProjectsDTO } from '../dto/projects.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProjectsDTO) {
    return await this.prisma.apiProjects.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.apiProjects.findMany();
  }

  async findOne(id: number) {
    const project = await this.prisma.apiProjects.findUnique({
      where: { id: Number(id) },
    });

    if (!project) {
      throw new NotFoundException('Project does not exist');
    }

    return project;
  }

  async update(id: number, data: ProjectsDTO) {
    const project = await this.prisma.apiProjects.findUnique({
      where: { id: Number(id) },
    });

    if (!project) {
      throw new NotFoundException('Project does not exist');
    }

    return await this.prisma.apiProjects.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id: number) {
    const project = await this.prisma.apiProjects.findUnique({
      where: { id: Number(id) },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return await this.prisma.apiProjects.delete({
      where: { id: Number(id) },
    });
  }
}
