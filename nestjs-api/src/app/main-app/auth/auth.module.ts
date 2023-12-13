import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserSessionsService } from '../user-sessions/user-sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { PassportModule } from '@nestjs/passport';
import { UserSessions } from '../user-sessions/user-session.entity';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtLogoutStrategy } from './strategies/jwt-logout.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserSessionsModule } from '../user-sessions/user-sessions.module';
import { UsersModule } from '../users/users.module';
import { UserOtpModule } from 'src/app/main-app/user-otp/user-otp.module';
import { HttpModule } from '@nestjs/axios';
import { EncryptionUtils } from 'src/utils/encrypt/encryption.utils';
@Module({
  imports: [
            UsersModule,
            UserOtpModule,
            UserSessionsModule,
            ConfigModule,
            PassportModule, 
            JwtModule.register({}),
            HttpModule
        
  ],
  controllers: [AuthController],
  providers: [AuthService,
        //  UsersService,UserSessionsService,
      JwtStrategy,LocalStrategy,JwtRefreshTokenStrategy,JwtLogoutStrategy,EncryptionUtils]
})


export class AuthModule {}

// https://github.com/vladwulf/nestjs-jwts/blob/main/src/auth/auth.service.ts
