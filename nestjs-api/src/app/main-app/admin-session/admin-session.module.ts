import { Module } from '@nestjs/common';
import { AdminSessionService } from './admin-session.service';
import { AdminSession } from './admin-session.entity';
import { AdminSessionController } from './admin-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([AdminSession])],
  providers: [AdminSessionService],
  controllers: [AdminSessionController],
  exports: [AdminSessionService],
})
export class AdminSessionModule {}
