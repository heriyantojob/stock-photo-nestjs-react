import { HttpException, HttpStatus,ForbiddenException, Injectable ,BadRequestException,InternalServerErrorException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserSessionsService } from '../user-sessions/user-sessions.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserSessionsDto } from '../user-sessions/dto/create-user-sessions.dto';
import { UpdateUserSessionsDto } from '../user-sessions/dto/update-user-sessions.dto';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config"
import RegisterDto from './dto/register.dto'
import { ConfigService } from '@nestjs/config';
import isRecord  from '../../../utils/base/isRecord';
import { DbErrorCode } from '../../../config/typeorm.config';
import { AxiosResponse,AxiosError } from 'axios'
const accesTokenExpired ="1h";
//const accesTokenExpired ="1d";
const refreshTokenExpired ="7d";

import * as slug from "slug"
import { UserOtpService } from 'src/app/main-app/user-otp/user-otp.service';
import VerifyDto from './dto/verify.dto';
import { HttpService } from '@nestjs/axios/dist';
import {firstValueFrom } from 'rxjs';
import * as FormData from 'form-data'
@Injectable()
export class AuthService {
    constructor(
      private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly userOtpService: UserOtpService,
        private readonly jwtService: JwtService,

        private readonly userSessionsService: UserSessionsService,
        private readonly httpService: HttpService,
        
    ) {}

    public async register(registrationData: RegisterDto,ip,user_agent) {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      let resultUserCreate = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      if (!resultUserCreate) throw new BadRequestException('Failed To register');

      let idOtp: string = uuidv4();
   
      let tokenOtp =  this.jwtService.sign({
        // "id":resultUser.id_user,
        "idUser":resultUserCreate.id_user,
        "id_user_otp":idOtp
      }, {
        secret: process.env.JWT_SCECRET_CONFIRMATION_MAIL,
        expiresIn: '1d'
      })
   

      const otp = this.generateOTP() 
      const tokenOtpHash = await bcrypt.hash(tokenOtp, 10);
      let resultOtpCreate = await this.userOtpService.create({
        id_user_otp:idOtp,
        email :registrationData.email,
  
        type_otp :"register",
        token :tokenOtpHash,
 
        otp:otp,
        status:0,
        id_user :resultUserCreate.id_user,

      },ip,user_agent);
      if(resultOtpCreate){
       
         await this.userOtpService.sendMailRegister({name:registrationData.name, email:registrationData.email,token:tokenOtp,otp})
      
      }
      return resultUserCreate

   
    }

    public async verify(verifyDto: VerifyDto,ip,user_agent) {
      let tokenPayload= await this.userOtpService.decodeToken(verifyDto.token)

      let resulToken =  await this.userOtpService.findUserOtpByToken(verifyDto.token,tokenPayload,"register")
      if (!resulToken ) {
        throw new BadRequestException('Email Register Not found Or Your email has been verified');
      }
      const isTokenMatch = await bcrypt.compare(
        verifyDto.token,
        resulToken.token,
      );

      if (!isTokenMatch ) {
        throw new BadRequestException('Token Not Match');
      }

      if (resulToken.id_user_otp !==tokenPayload.id_user_otp ) {
        throw new BadRequestException('Token Not Match');
      }
      let resultUpdateUserActive =  await this.usersService.updateUserActive(tokenPayload.idUser)
      let resultUpdateUseOtp =  await this.userOtpService.updateUseOtp(tokenPayload.id_user_otp)
   
  

      return resulToken
  
    }

     async validateUser(email,password){

     
        const user = await this.usersService.findOneLogin(email);
        if(!user) new BadRequestException('Username or Password not found'); 

        if(user.status == 0 ){
          throw new BadRequestException('Verify your email before login');
        }
        else if(user.status == 1 )  {
         let isValidPassword = await this.verifyPassword(password, user.password);
       
          return user;
        }
        else if(user.status == 2 ){
          throw new BadRequestException('Your account is block Please contact us');
        }
        else{
          throw new BadRequestException('Status Not found');
        }

        // await this.verifyPassword(password, user.password);
        // return user;
        
        
        
       
     
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
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
    }


    async login(user: any, createUserSessionsDtoTemp:any) {
   
        let idSession: string = uuidv4();
        let token =await this.getToken({
          // "id":resultUser.id_user,
          "idSession":idSession,
          "isUser":true
        })
        //create session user
        const currentHashedRefreshToken = await bcrypt.hash(token.refresh_token, 10);

         let createUserSessionsDto : CreateUserSessionsDto ={
            id_user_session :idSession,
            id_user:user.id_user,
            // access_token:"asd",
            refresh_token:currentHashedRefreshToken,
            ip:createUserSessionsDtoTemp.ip,
            user_agent: createUserSessionsDtoTemp.user_agent
        }

        let resultSession =   await this.userSessionsService.create(createUserSessionsDto);       
        if (!resultSession) throw new ForbiddenException('Access Denied');

        return {
          success:true,
          email: user.email,
          username: user.username,
          accessToken:token?.access_token,
          refreshToken:token?.refresh_token,
        
        };
    }

    async refresh(   userDataRefresh,updateUserSessionsDtoTemp:any) {
      // req.user.idSession
      let idSession = userDataRefresh.idSession
      let token =await this.getToken({
        "idSession":idSession,
        "isUser":true
      })
      
      const currentHashedRefreshToken = await bcrypt.hash(token.refresh_token, 10);

      let updateUserSessionsDto : UpdateUserSessionsDto ={
          id_user_session:idSession,
          refresh_token:currentHashedRefreshToken,
          ip:updateUserSessionsDtoTemp.ip,
          user_agent: updateUserSessionsDtoTemp.user_agent
      }


      let resultSession =   await this.userSessionsService.update(updateUserSessionsDto,idSession);
    
      if (!resultSession) throw new ForbiddenException('Access Denied');

      return {
        success:true,
        email: userDataRefresh.email,
        username: userDataRefresh.username,
        accessToken:token?.access_token,
        refreshToken:token?.refresh_token,
      
      };

    }


    async logout(   idSession: string) {
      let resultSession =   await this.userSessionsService.deleteSoft(idSession);
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

    

 async checkChapcha(gRecaptchaToken:string): Promise<any>{

  // "Content-Type": "application/x-www-form-urlencoded",
  const form = new FormData();
  form.append('secret', process.env.RECAPTCHA_SECRET_KEY);
  form.append('response', gRecaptchaToken);

 
    try {
      const responseData =await this.httpService.axiosRef.post(  'https://www.google.com/recaptcha/api/siteverify',form, { headers: form.getHeaders() });


      if (responseData?.data?.score > 0.5) {
        // Save data to the database from here
        return responseData;
      } else {
        throw new ForbiddenException(['Google ReCaptcha Failure. Please Try submit Again']);
      }
    } catch (error) {
      throw new ForbiddenException('Error submitting  Chapcha. Please Try submit Again');
    }

    
  }


    

    generateOTP(otplenght:number=6) :string{
          
      // Declare a digits variable 
      // which stores all digits
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < otplenght; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }

  
        
        
    
}
