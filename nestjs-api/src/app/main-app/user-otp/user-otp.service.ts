import { Injectable,BadRequestException } from '@nestjs/common';
import { UserOtp } from './user-otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from 'src/app/main-app/mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserOtpDto } from './dto/create-user-otp.dto';
import { use } from 'passport';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import "dotenv/config"

@Injectable()
export class UserOtpService {

    constructor(
        private mailerService: MailerService,
        private mailService: MailService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        @InjectRepository(UserOtp)
        private readonly userOtpRepository: Repository<UserOtp>,
      ) {}

      async create(createdUserOtp: CreateUserOtpDto,ip:string,user_agent:string) {
        const userOtp = new UserOtp();
        if(createdUserOtp?.id_user_otp) userOtp.id_user_otp   = createdUserOtp.id_user_otp;
        
        userOtp.email = createdUserOtp.email;
        userOtp.phone = createdUserOtp.phone;
        userOtp.type_otp= createdUserOtp.type_otp;
        userOtp.token= createdUserOtp.token;
        userOtp.otp= createdUserOtp.otp;
        userOtp.status= createdUserOtp.status;
        userOtp.expired_at= createdUserOtp.expired_at;
        userOtp.user   = createdUserOtp.id_user;

        userOtp.ip   = ip;
        userOtp.user_agent   = user_agent;
        return this.userOtpRepository.save(userOtp);   
      }
      

      async sendMailRegister(user:any) {
        const url =  `${process.env.BASE_URL_FRONT_END}/signup/verify?token=${user.token}`;
        console.log("mail Url ",url)
        try {
          await this.mailerService.sendMail({
            to: `${user.email}`,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: ' Confirm your Email',
            template: './confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
              name: user.name,
              url,
            },
          });
        } catch (error) {
            
        }
    
      }
      public async decodeToken(token: string) {
        // console.log("secret = ",this.configService.get('JWT_SCECRET_CONFIRMATION_MAIL'))
        // console.log("token = ",token)
        try {
          const payload = await this.jwtService.verify(token, {
            secret: this.configService.get('JWT_SCECRET_CONFIRMATION_MAIL'),
          // secret: process.env.JWT_SCECRET_CONFIRMATION_MAIL,
          });

          if (typeof payload === 'object' ) {
            return payload;
          }
          // if (typeof payload === 'object' && 'email' in payload) {
          //   return payload;
          // }
          throw new BadRequestException();
        } catch (error) {
          // console.log(error)
          if (error?.name === 'TokenExpiredError') {
            throw new BadRequestException('Email confirmation token expired');
          }
          throw new BadRequestException('Bad confirmation token');
        }
      }

      public async findUserOtpByToken(token:string,tokenPayload,type_otp): Promise<UserOtp>{
            //  let tokenPayload= this.decodeToken(token)

             return await this.userOtpRepository.findOne({
              select:{
                token:true,
                id_user_otp:true,
                otp:true,
                created_at:true,
                user: {
                  id_user:true
                }
              },
              order: {
                created_at : "DESC"
              },
              relations: ["user"],
              where: {
                // id_template: id_template,
                status :0,
                type_otp,
                user: {
                  id_user:tokenPayload?.idUser
                },
              },
            });

      }

      public async updateUseOtp(id_user_otp): Promise<UserOtp> {
        const userOtp = new UserOtp();
        userOtp.id_user_otp=id_user_otp
        userOtp.status   = 1
        return this.userOtpRepository.save(userOtp);
      }
}
