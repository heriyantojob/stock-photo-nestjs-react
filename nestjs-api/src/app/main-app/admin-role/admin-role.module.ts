import { Module } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AdminRole} from "./admin_role.entity"
@Module({
  imports: [TypeOrmModule.forFeature([AdminRole])],
  providers: [AdminRoleService],
  exports: [AdminRoleService],
})
export class AdminRoleModule {}
