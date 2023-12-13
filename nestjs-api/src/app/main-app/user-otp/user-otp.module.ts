import { Module } from '@nestjs/common';
import { UserOtpController } from './user-otp.controller';
import { UserOtpService } from './user-otp.service';
import { UserOtp } from './user-otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/app/main-app/mail/mail.module';
@Module({

  imports: [
    ConfigModule,
    MailModule,
    TypeOrmModule.forFeature([UserOtp]),
    JwtModule.register({}),

  ],
  controllers: [UserOtpController],
  exports: [UserOtpService],
  providers: [UserOtpService]
})
export class UserOtpModule {}
