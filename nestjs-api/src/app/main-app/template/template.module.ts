import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './template.entity';
import { TemplateFileModule } from '../template-file/template-file.module'
@Module({
  imports: [TypeOrmModule.forFeature([Template]),TemplateFileModule],
  providers: [TemplateService],
  controllers: [TemplateController],
  exports: [TemplateService],
  
})
export class TemplateModule {}
