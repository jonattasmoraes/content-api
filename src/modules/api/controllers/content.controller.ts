import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ContentService } from '../services/content.service';
import { ContenteDTO } from '../dto/content.dto';

@Controller('api/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('')
  async create(@Body() data: ContenteDTO) {
    return this.contentService.create(data);
  }

  @Get('')
  async findAll() {
    return this.contentService.findAll();
  }

  @Get(':contentId')
  async findOne(@Param('contentId') contentId: number) {
    return this.contentService.findOne(contentId);
  }

  @Put(':contentId')
  async update(
    @Param('contentId') contentId: number,
    @Body() data: ContenteDTO,
  ) {
    return this.contentService.update(contentId, data);
  }

  @Delete(':contentId')
  async delete(@Param('contentId') contentId: number) {
    return this.contentService.delete(contentId);
  }
}
