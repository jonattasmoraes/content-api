import { Injectable, NotFoundException } from '@nestjs/common';

import { ContenteDTO } from '../dto/content.dto';
import { PrismaService } from '../../../database/PrismaService';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(data: ContenteDTO) {
    return await this.prisma.apiContent.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.apiContent.findMany();
  }

  async findOne(id: number) {
    const content = await this.prisma.apiContent.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content does not exist');
    }

    return content;
  }

  async update(id: number, data: ContenteDTO) {
    const content = await this.prisma.apiContent.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content does not exist');
    }

    return await this.prisma.apiContent.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const content = await this.prisma.apiContent.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return await this.prisma.apiContent.delete({
      where: { id },
    });
  }
}
