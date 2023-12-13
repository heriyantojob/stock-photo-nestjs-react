
import { Injectable,BadRequestException,ForbiddenException } from '@nestjs/common';

import { AdminService } from 'src/app/main-app/admin/admin.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminSessionsDto } from 'src/app/main-app/admin-session/dto/create-admin-sessions.dto';
import { AdminSessionService } from 'src/app/main-app/admin-session/admin-session.service';
import { UpdateadminSessionsDto } from 'src/app/main-app/admin-session/dto/update-admin-sessions.dto';
// import { AdminSession } from 'src/app/main-app/admin-session/admin-session.entity';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as moment from 'moment'
import { EncryptionUtils } from 'src/utils/encrypt/encryption.utils';

const accesTokenExpiredAmount =0.2
const accesTokenExpiredTimeUnit ="m";
const accesTokenExpired =accesTokenExpiredAmount+accesTokenExpiredTimeUnit;


const refreshTokenExpiredAmount =8;
const refreshTokenExpiredTimeUnit ="h";
const refreshTokenExpired =refreshTokenExpiredAmount+refreshTokenExpiredTimeUnit;
@Injectable()
export class AuthAdminAppService {
  
    constructor(
          private readonly encryptionUtils: EncryptionUtils,

        // private readonly configService: ConfigService,
          private readonly adminService: AdminService,

          private readonly jwtService: JwtService,
  
          private readonly adminSessionService: AdminSessionService,
          private configService: ConfigService
          // private readonly httpService: HttpService,
          
      ) {}
    
    async validateAdmin(email,password){

        try {
          const user = await this.adminService.findOneLogin(email);
          await this.verifyPassword(password, user.password);
          return user;
        } catch (error) {
          throw new BadRequestException(
            'Wrong credentials provided'
          );
        }
      }



      //login

      async login(dataUserGuard: any, dataRequest:any) {

        let idSession: string = uuidv4();
        let token =await this.getToken({
          // "id":resultUser.id_user,
          "idSession":idSession,
          isStaff  : true,
        })
        const currentHashedRefreshToken = await bcrypt.hash(token.refresh_token, 10);
        //const currentHashedRefreshToken =  this.encryptionUtils.encrypt(token.refresh_token);


        let createAdminSessionsDto : CreateAdminSessionsDto ={
          id_admin_session :idSession,
          id_admin:dataUserGuard.id_admin,
          // access_token:"asd",
          refresh_token:currentHashedRefreshToken,
          ip:dataRequest.ip,
          user_agent: dataRequest.user_agent
        }

        let resultSession =   await this.adminSessionService.create(createAdminSessionsDto);       
        if (!resultSession) throw new ForbiddenException('Access Denied');

        return {
          success:true,
          email: dataUserGuard.email,
          username: dataUserGuard.username,
          accessToken:token?.access_token,
          refreshToken:token?.refresh_token,
        
        };

        //console.log(createUserSessionsDto);

  }


    async logout(   idSession: string) {
      let resultSession =   await this.adminSessionService.deleteSoft(idSession);
    }

    async refresh(   userDataRefresh,updateUserSessionsDtoTemp:any) {
      // req.user.idSession
      let idSession = userDataRefresh.idSession
      let token =await this.getToken({
        "idSession":idSession,
        isStaff  : true,
      })
      
      const currentHashedRefreshToken = await bcrypt.hash(token.refresh_token, 10);
    //  const currentHashedRefreshToken =  this.encryptionUtils.encrypt(token.refresh_token);

      let updateUserSessionsDto : UpdateadminSessionsDto ={
          id_admin_session:idSession,
          refresh_token:currentHashedRefreshToken,
          ip:updateUserSessionsDtoTemp.ip,
          user_agent: updateUserSessionsDtoTemp.user_agent
      }


      let resultSession =   await this.adminSessionService.update(updateUserSessionsDto,idSession);
    
      if (!resultSession) throw new ForbiddenException('Access Denied');

      return {
        success:true,
        email: userDataRefresh.email,
        username: userDataRefresh.username,
        accessToken:token?.access_token,
        refreshToken:token?.refresh_token,
      
      };

    }
        
    async getToken(payloadData){
      const payload = payloadData;
      let access_token =  this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        // expiresIn: '15m',
        expiresIn: accesTokenExpired,
        
      }) 
      let refresh_token =  this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        // expiresIn: '7d',
        expiresIn: refreshTokenExpired
      }) 
      return {
        access_token: access_token,
        refresh_token: refresh_token,
      };
    }

    public  async verifyPassword(
      plainTextPassword: string,
      hashedPassword: string,
    ) {
      const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        hashedPassword,
      );
        if (!isPasswordMatching) {
      
          throw new BadRequestException(
            'Wrong credentials provided'
          );
        }
      }
      setCookieRefresh(res: Response, data: any) {
        const refreshTokenSecret:string = this.configService.get<string>('JWT_COOKIE_REFRESH_ADMIN_SECRET');
        const cookieName = this.configService.get<string>('JWT_COOKIE_REFRESH_ADMIN');
      //  const cookieName =  "tes";
        // console.log("refresh TOken data",data)
        const refreshTokenExpired = moment().add(refreshTokenExpiredAmount, refreshTokenExpiredTimeUnit).toDate()
       
        res.cookie(cookieName, data, {
          signed: true,
          httpOnly: true,
          secure: true,
          //sameSite: 'strict',
          
          expires:refreshTokenExpired,
        
        });
      }

      // encryptData(data: string): string {
      //   return this.encryptionUtils.encrypt(data);
      // }

    
      
  
}
