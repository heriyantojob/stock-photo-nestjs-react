import { Module } from '@nestjs/common';
import { UserAdminAppService } from './user-admin-app.service';
import { UserAdminAppController } from './user-admin-app.controller';
// import { JwtAdminStrategy } from '../auth-admin-app/strategies/jwt-admin.strategy';
import { AuthAdminAppModule } from '../auth-admin-app/auth-admin-app.module';
import { UsersModule } from 'src/app/main-app/users/users.module';

@Module({
  imports: [AuthAdminAppModule,UsersModule],
  providers: [UserAdminAppService],
  controllers: [UserAdminAppController],
  exports: [UserAdminAppService],
})
export class UserAdminAppModule {}
