import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AdminSession,tableAdminSessions } from './admin-session.entity';
import { tableAdmin } from '../admin/admin.entity';
import * as bcrypt from 'bcrypt';
import { CreateAdminSessionsDto } from './dto/create-admin-sessions.dto';
import { UpdateadminSessionsDto } from './dto/update-admin-sessions.dto';

@Injectable()
export class AdminSessionService {
    constructor(
        @InjectRepository(AdminSession)
        private readonly adminSessionRepository: Repository<AdminSession>,
        @InjectEntityManager() private userSessionsManager: EntityManager,
        @InjectDataSource() private dataSource: DataSource
      ) {}
    create(createAdminSessionsDto:CreateAdminSessionsDto){
        const adminSession = new AdminSession();
        if(createAdminSessionsDto?.id_admin_session){
            adminSession.id_admin_session   = (createAdminSessionsDto.id_admin_session);
        }
        
        adminSession.admin   = createAdminSessionsDto.id_admin;
        // userSessions.access_token = createUserSessionsDto.access_token;

        adminSession.refresh_token = createAdminSessionsDto.refresh_token;
        adminSession.ip = createAdminSessionsDto.ip;
        adminSession.user_agent = createAdminSessionsDto.user_agent;
        adminSession.updated_at =   new Date()
        return this.adminSessionRepository.save(adminSession);
    }
    update(updateadminSessionsDto: UpdateadminSessionsDto,idSession): Promise<AdminSession> {
      const userSessions = new AdminSession();
      userSessions.id_admin_session   = updateadminSessionsDto.id_admin_session;
      // userSessions.access_token = createUserSessionsDto.access_token;
      userSessions.refresh_token = updateadminSessionsDto.refresh_token;
      userSessions.ip = updateadminSessionsDto.ip;
      userSessions.user_agent = updateadminSessionsDto.user_agent;
      //  this.userSessionsRepository.save(userSessions);
      return this.adminSessionRepository.save(userSessions);
    }


    async findOneById(id: string) {
        
           const resultData = await this.adminSessionRepository
           .createQueryBuilder(tableAdminSessions)
           .leftJoin(tableAdminSessions+".admin", "admin")
           .select(tableAdminSessions+".created_at")
           .addSelect(tableAdmin+".id_admin")
           .where(tableAdminSessions+".id_admin_session= :idAdminSession", { idAdminSession: id })
           .getOne()
  
         return resultData
       }

       async findOneIfRefreshTokenMatches(refreshToken: string, idSession: string) {

 
         const   resultDataSession= await this.adminSessionRepository
         .createQueryBuilder(tableAdminSessions)
         .leftJoin(tableAdminSessions+".admin", "admin")
         .where(tableAdminSessions+".id_admin_session= :idAdminSession", { idAdminSession: idSession })
         .select(tableAdminSessions+".refresh_token")
         .addSelect(tableAdmin+".username")
         .addSelect(tableAdmin+".email")
         .addSelect(tableAdmin+".id_admin")
         .getOne()
      
          if(!resultDataSession)   throw new UnauthorizedException(); 
     
         const isRefreshTokenMatching = await bcrypt.compare(
           refreshToken,
           resultDataSession.refresh_token,
         );
     
         if (isRefreshTokenMatching) {
      
           return resultDataSession;
         }
      }

      async deleteSoft(id: string): Promise<void> {
        const deleteResponse = await this.adminSessionRepository.softDelete(id);

      }
}
