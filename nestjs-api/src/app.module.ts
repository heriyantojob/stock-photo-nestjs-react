import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/main-app/auth/auth.module';
import { UsersModule } from './app/main-app/users/users.module';
import { UserSessionsModule } from './app/main-app/user-sessions/user-sessions.module';
import { ConfigModule } from '@nestjs/config';
import "dotenv/config"

import { typeOrmConfig } from './config/typeorm.config';
import { TemplateModule } from './app/main-app/template/template.module';
import { TemplateFileModule } from './app/main-app/template-file/template-file.module';

import { TemplateProductLangModule } from './app/main-app/template-product-lang/template-product-lang.module';
import { TemplateProductModule } from './app/main-app/template-product/template-product.module';
// import { JwtStrategy } from './auth/strategies/jwt.strategy';
// import { LocalStrategy } from './auth/strategies/local.strategy';
import { TemplateUploadModule } from './app/main-app/template-upload/template-upload.module';
import { AdminModule } from './app/main-app/admin/admin.module';
import { AdminRoleModule } from './app/main-app/admin-role/admin-role.module';
import { UserOtpModule } from './app/main-app/user-otp/user-otp.module';


import { MailModule } from './app/main-app/mail/mail.module';

import { AuthAdminAppModule } from './app/admin-app/auth-admin-app/auth-admin-app.module';
import { AdminSessionModule } from './app/main-app/admin-session/admin-session.module';

import { UserAdminAppModule } from './app/admin-app/user-admin-app/user-admin-app.module';
import { TemplateAdminAppModule } from './app/admin-app/template-admin-app/template-admin-app.module';
import { AdminAdminAppModule } from './app/admin-app/admin-admin-app/admin-admin-app.module';
import { ConfigService } from 'aws-sdk';

import { EncryptionModule } from './app/shared-app/encryption/encryption.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    // ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig), 
     UsersModule, UserSessionsModule,AuthModule, TemplateModule, TemplateFileModule, TemplateProductLangModule, TemplateProductModule, TemplateUploadModule, AdminModule, AdminRoleModule, UserOtpModule, MailModule,
     AuthAdminAppModule,
     AdminSessionModule,
     UserAdminAppModule,
     TemplateAdminAppModule,
     AdminAdminAppModule,
     EncryptionModule,

  ],
  controllers: [AppController],
  //https://stackoverflow.com/questions/52650895/how-to-use-nestjs-logging-service
  providers: [AppService],
})
export class AppModule {
  
}
