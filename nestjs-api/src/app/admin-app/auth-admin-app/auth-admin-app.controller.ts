
import { 
    Controller , HttpCode,
    UseGuards ,Request,Res,
    Post,Get,Ip,BadRequestException,Body, ClassSerializerInterceptor,
    UseInterceptors,UnauthorizedException, Param,
} from '@nestjs/common';
import { routesAdminApp } from 'src/config/routes';
import { AuthAdminAppService } from './auth-admin-app.service';
import { Response } from 'express';
import * as moment from 'moment'
import { LocalAdminAuthGuard } from './guards/local-admin-auth.guard';
import { JwtAdminAuthGuard } from './guards/jwt-admin-auth.guard';
import JwtAdminLogoutGuard from './guards/jwt-admin-logout.guard';
import JwtAdminRefreshGuard from './guards/jwt-admin-refresh.guard';
import { EncryptionUtils } from 'src/utils/encrypt/encryption.utils';



@Controller(routesAdminApp+'/auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthAdminAppController {
    constructor(private authAdminAppService: AuthAdminAppService,private encryptionUtils: EncryptionUtils) {
  
    }
    private readonly password = 'Password used to generate key';

    @HttpCode(200)
    @UseGuards(LocalAdminAuthGuard)
    @Post('login')
    async login(@Request() req,@Ip() ip,@Res({ passthrough: true }) response: Response){
       
       // return req.user.id_admin;
        let dataRequest = {    
            // id_admin : req.user.id_admin,
            // email : req.user.email,
            // username : req.user.username,
            ip:ip,
            user_agent: req.headers["user-agent"]
        }

        let result = await this.authAdminAppService.login(req.user,dataRequest);
 
        if(result?.success ){
           this.authAdminAppService.setCookieRefresh(response,result.refreshToken)

            // const refreshTokenExpired = moment().add(7, 'd').toDate()
            // response.cookie('refreshToken', result.refreshToken, {
            //     httpOnly: true, //accessible only by web server 
            //     secure: true, //https
            //     sameSite:  'none', //cross-site cookie
            //     expires:refreshTokenExpired
            //     // maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
            
            // })
           return result

        }else{
            throw new BadRequestException('Failed login');
        }
    }

    
    @UseGuards(JwtAdminRefreshGuard)
    @Get('refresh')
    async refresh(@Request() req,@Ip() ip) {

        let dataRequest = {    
            // id_user : req.user.id_user,
            // email : req.user.email,
            // username : req.user.username,
            ip:ip,
            user_agent: req.headers["user-agent"]
        
        }

        
        const resultRefresh = this.authAdminAppService.refresh(
            req.user,dataRequest
          );

          
        return resultRefresh;
        // return req.user
    }

    //process logout
    @UseGuards(JwtAdminRefreshGuard)
    @HttpCode(204)
    @Post('logout')
    async logout(@Request() req,@Res({ passthrough: true }) response: Response) {

         const resultRefresh = this.authAdminAppService.logout(
            req.user.idSession
          );
        //  response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true })

          //response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none' as 'Lax' | 'Strict' | 'None', secure: true })
          response.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
    }

   


}
//https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/