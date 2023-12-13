import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Admin} from "./admin.entity"
import { AdminRoleModule } from '../admin-role/admin-role.module';
@Module({
  imports: [TypeOrmModule.forFeature([Admin]),AdminRoleModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
