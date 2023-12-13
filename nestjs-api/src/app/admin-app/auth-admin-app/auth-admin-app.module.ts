
import { AuthAdminAppService } from './auth-admin-app.service';
import { AuthAdminAppController } from './auth-admin-app.controller';
import { AdminSessionModule } from 'src/app/main-app/admin-session/admin-session.module';
import { ConfigModule,ConfigService  } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AdminModule } from 'src/app/main-app/admin/admin.module';
import { LocalAdminStrategy } from './strategies/local-admin.strategy';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import * as cookieParser from 'cookie-parser';
import { JwtAdminLogoutStrategy } from './strategies/jwt-admin-logout.strategy';
import { JwtAdminRefreshStrategy } from './strategies/jwt-admin-refresh.strategy';

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EncryptionUtils } from 'src/utils/encrypt/encryption.utils';

@Module({
  imports: [
    AdminModule,AdminSessionModule,
    ConfigModule,
    PassportModule, 
    JwtModule.register({}),
    HttpModule

  ],
  providers: [AuthAdminAppService,LocalAdminStrategy,JwtAdminStrategy,JwtAdminLogoutStrategy,JwtAdminRefreshStrategy,EncryptionUtils],
  controllers: [AuthAdminAppController]
})
export class AuthAdminAppModule implements NestModule{
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const secret = this.configService.get<string>('JWT_COOKIE_REFRESH_ADMIN_SECRET');
    consumer
      .apply(cookieParser(secret))
      .forRoutes("*");
  }
}
