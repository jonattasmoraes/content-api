import { Module } from '@nestjs/common';

import { ContentController } from '../controllers/content.controller';
import { ContentService } from '../services/content.service';
import { PrismaService } from '../../../database/PrismaService';

@Module({
  controllers: [ContentController],
  providers: [ContentService, PrismaService],
})
export class ContentModule {}
