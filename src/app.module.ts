import { Module } from '@nestjs/common';

import { ContentModule } from './modules/api/modules/content.module';
import { ProjectsModule } from './modules/api/modules/projects.module';

@Module({
  imports: [ContentModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
