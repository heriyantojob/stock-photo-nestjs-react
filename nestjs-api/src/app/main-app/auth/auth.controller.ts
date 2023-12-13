import { 
            Controller , HttpCode,
            UseGuards ,Request,Res,
            Post,Get,Ip,BadRequestException,Body, ClassSerializerInterceptor,
            UseInterceptors,UnauthorizedException,
        } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

import {JwtAuthGuard} from './guards/jwt-auth.guard'

import RegisterDto from './dto/register.dto';
import * as moment from 'moment'
import * as crypto from 'crypto'
import VerifyDto from './dto/verify.dto';
import JwtLogoutGuard from './guards/jwt-logout.guard';
import { logDebug } from 'src/utils/base/logDebug';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {
  
    }
//==============process login
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req,@Ip() ip,@Res({ passthrough: true }) response: Response){
       
 
        let createUserSessionsDtoTemp = {    
            id_user : req.user.id_user,
            email : req.user.email,
            username : req.user.username,
            ip:ip,
            user_agent: req.headers["user-agent"]
        }

        let result = await this.authService.login(req.user,createUserSessionsDtoTemp);

        if(result?.success ){

            const refreshTokenExpired = moment().add(7, 'd').toDate()
            response.cookie('refreshToken', result.refreshToken, {
                httpOnly: true, //accessible only by web server 
                secure: true, //https
                sameSite:  'none', //cross-site cookie
                expires:refreshTokenExpired
                // maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
            
            })
           return result

        }else{
            throw new BadRequestException('Failed login');
        }
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refresh(@Request() req,@Ip() ip) {
     

        let updateUserSessionsDtoTemp = {    
       
            ip:ip,
            user_agent: req.headers["user-agent"]
        
        }

        const resultRefresh = this.authService.refresh(
            req.user,updateUserSessionsDtoTemp
          );

          
        return resultRefresh;
        // return req.user
    }

// proceess register
    @Post('register')
    async register(@Body() registrationDto: RegisterDto,@Request() req,@Ip() ip) {
   
        const user_agent= req.headers["user-agent"]
       let resultChapcha =  await  this.authService.checkChapcha(registrationDto.gRecaptchaToken);
        let resultRegister =  await  this.authService.register(registrationDto,  ip,user_agent);
        
       // return resultRegister
         return {message:["Success Register Please check your Email"]}
    
    }

      //process logout
      @UseGuards(JwtRefreshGuard)
      @HttpCode(204)
      @Post('logout')
      async logout(@Request() req,@Res({ passthrough: true }) response: Response) {
  
           const resultRefresh = this.authService.logout(
              req.user.idSession
            );
            response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
      }

    @Post('verify')
    async verify(@Body() verifyDto: VerifyDto,@Request() req,@Ip() ip) {

        const user_agent= req.headers["user-agent"]
        await this.authService.verify(verifyDto,  ip,user_agent)
        return {message:["Congratulations, your account has been verified"]}
    
    }

  

}
