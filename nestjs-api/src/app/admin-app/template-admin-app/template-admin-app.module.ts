import { Module } from '@nestjs/common';
import { TemplateAdminAppService } from './template-admin-app.service';
import { TemplateAdminAppController } from './template-admin-app.controller';
import { TemplateModule } from 'src/app/main-app/template/template.module';
import { TemplateService } from 'src/app/main-app/template/template.service';
import { TemplateFileModule } from 'src/app/main-app/template-file/template-file.module';

@Module({
  imports: [TemplateModule,TemplateFileModule],
  providers: [TemplateAdminAppService],
  controllers: [TemplateAdminAppController],
  exports: [TemplateAdminAppService],
})
export class TemplateAdminAppModule {}
