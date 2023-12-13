import { Module } from '@nestjs/common';

import { UserSessionsService } from './user-sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessions } from './user-session.entity';
import { UserSessionsController } from './user-sessions.controller';
@Module({
  imports: [TypeOrmModule.forFeature([UserSessions])],

  providers: [UserSessionsService],

  controllers: [UserSessionsController],
  exports: [UserSessionsService],
})
export class UserSessionsModule {
}
