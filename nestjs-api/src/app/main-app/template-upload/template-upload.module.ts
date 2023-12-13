import { Module } from '@nestjs/common';
import { TemplateUploadController } from './template-upload.controller';
import { TemplateUploadService } from './template-upload.service';
import { TemplateFileService } from '../template-file/template-file.service'
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TemplateService } from '../template/template.service'
import { TemplateModule } from '../template/template.module'
import { TemplateFileModule } from '../template-file/template-file.module'
import { UsersModule } from '../users/users.module';
import { TemplateService } from 'src/app/main-app/template/template.service';
import { UsersService } from 'src/app/main-app/users/users.service';

@Module({
  imports: [TemplateModule,TemplateFileModule],
  controllers: [TemplateUploadController],
  providers: [TemplateUploadService,]
})
export class TemplateUploadModule {}
