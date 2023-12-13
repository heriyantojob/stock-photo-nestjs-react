import { Injectable,UnauthorizedException,ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { TokenExpiredError } from 'jsonwebtoken';

import { AdminSessionService } from 'src/app/main-app/admin-session/admin-session.service';
@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy,'jwt-admin-auth') {
  constructor(private readonly adminSessionsService: AdminSessionService) {
    

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ignoreExpiration: true,
      
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //  console.log("jwt stategy payload : ",payload)
    const now = Date.now().valueOf() / 1000;
    if (payload.exp < now) {
      throw new UnauthorizedException("Unauthorized")
      
    }
  

    //===check database
    let resultSession = await this.adminSessionsService.findOneById(payload.idSession);
    // console.log("resultSession",resultSession)
  
    if(!resultSession)   throw new UnauthorizedException("token invalid")
   
    //==check token expired

   

    return { idSession: payload.idSession,
            id_admin:resultSession.admin.id_admin
          };
  }
 
}
