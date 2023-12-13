import { Module } from '@nestjs/common';
import { AdminAdminAppService } from './admin-admin-app.service';
import { AdminAdminAppController } from './admin-admin-app.controller';
import { AdminModule } from 'src/app/main-app/admin/admin.module';
import { AdminRoleModule } from 'src/app/main-app/admin-role/admin-role.module';

@Module({
  imports: [AdminModule],
  providers: [AdminAdminAppService],
  controllers: [AdminAdminAppController]
})
export class AdminAdminAppModule {}
