import { Module } from '@nestjs/common';
import { TemplateFileController } from './template-file.controller';
import { TemplateFileService } from './template-file.service';
import { TemplateFile } from './template-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([TemplateFile])],
  controllers: [TemplateFileController],
  providers: [TemplateFileService],
  exports: [TemplateFileService],
})
export class TemplateFileModule {}
