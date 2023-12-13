import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository , InjectEntityManager, InjectDataSource} from '@nestjs/typeorm';
import { Repository,EntityManager,DataSource  } from 'typeorm';
import {CreateUserSessionsDto} from "./dto/create-user-sessions.dto"
import {UpdateUserSessionsDto} from "./dto/update-user-sessions.dto"
import * as bcrypt from 'bcrypt';

import { UserSessions } from './user-session.entity';
@Injectable()
export class UserSessionsService {
    constructor(
        @InjectRepository(UserSessions)
        private readonly userSessionsRepository: Repository<UserSessions>,
        @InjectEntityManager() private userSessionsManager: EntityManager,
        @InjectDataSource() private dataSource: DataSource
      ) {}
      create(createUserSessionsDto: CreateUserSessionsDto): Promise<UserSessions> {
        const userSessions = new UserSessions();
        if(createUserSessionsDto?.id_user_session){
          userSessions.id_user_session   = (createUserSessionsDto.id_user_session);
        }
        
        userSessions.user   = createUserSessionsDto.id_user;
        // userSessions.access_token = createUserSessionsDto.access_token;

        userSessions.refresh_token = createUserSessionsDto.refresh_token;
        userSessions.ip = createUserSessionsDto.ip;
        userSessions.user_agent = createUserSessionsDto.user_agent;
        userSessions.updated_at =   new Date()
     
        
    
        return this.userSessionsRepository.save(userSessions);
      }


      update(updateUserSessionsDto: UpdateUserSessionsDto,idSession): Promise<UserSessions> {
        const userSessions = new UserSessions();
        userSessions.id_user_session   = updateUserSessionsDto.id_user_session;
        // userSessions.access_token = createUserSessionsDto.access_token;
        userSessions.refresh_token = updateUserSessionsDto.refresh_token;
        userSessions.ip = updateUserSessionsDto.ip;
        userSessions.user_agent = updateUserSessionsDto.user_agent;
        //  this.userSessionsRepository.save(userSessions);
        return this.userSessionsRepository.save(userSessions);
      }

    

      
      async findOneById(id: string) {
          const resultData = await this.userSessionsRepository
          .createQueryBuilder("user_sessions")
          .leftJoin("user_sessions.user", "user")
          .select("user_sessions.created_at")
          .addSelect("user.id_user")
          .where("user_sessions.id_user_session= :idUserSession", { idUserSession: id })
          .getOne()
          //.getMany();
    
        // console.log("result data : ",resultData)
        return resultData
      }

    

    

      async findOneIfRefreshTokenMatches(refreshToken: string, idSession: string) {
   
        const   resultDataSession= await this.userSessionsRepository
        .createQueryBuilder("user_sessions")
        .leftJoin("user_sessions.user", "user")
        .where("user_sessions.id_user_session= :idUserSession", { idUserSession: idSession })
        .select("user_sessions.refresh_token")
        .addSelect("user.username")
        .addSelect("user.email")
        .addSelect("user.id_user")
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
      // findOneById(id: string): Promise<UserSessions> {
      //   return "this.userSessionsRepository.findOneBy({ id_user_session: id })";
      //   //return this.userSessionsRepository.findOneBy({ id_user_session: id });
      // }

      async deleteSoft(id: string): Promise<void> {
        const deleteResponse = await this.userSessionsRepository.softDelete(id);

      }
     
}
