import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

// import { UserSessionsModule } from '../user-sessions/user-sessions.module';

// import { JwtStrategy } from '../auth/strategies/jwt.strategy'
// import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
              TypeOrmModule.forFeature([User])
            ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService]
})
export class UsersModule {}
