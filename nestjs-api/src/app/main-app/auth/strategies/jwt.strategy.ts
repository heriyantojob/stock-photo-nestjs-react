import { Injectable,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import {UserSessionsService} from "../../user-sessions/user-sessions.service"
import { logDebug } from 'src/utils/base/logDebug';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly userSessionsService: UserSessionsService,
   
    ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //  console.log("jwt stategy payload : ",payload)


    if(!payload.isUser)  throw new UnauthorizedException("token invalid")
    let resultSession = await this.userSessionsService.findOneById(payload.idSession);
    // console.log("result validate : ",resultSession)
    if(!resultSession)   throw new UnauthorizedException("token invalid")

    //check token expired

    
   


    return { idSession: payload.idSession,idUser:resultSession.user.id_user};
  }
}
