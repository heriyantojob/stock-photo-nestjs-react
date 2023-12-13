import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import { UserSessionsService } from '../../user-sessions/user-sessions.service';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly userSessionsService: UserSessionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload) {
  
    //if(!payload.isUser)  throw new UnauthorizedException("token invalid")
    const refreshToken = request.cookies?.refreshToken;
 
    // return  payload
    // return { payload: payload };
    const resultSession =await this.userSessionsService.findOneIfRefreshTokenMatches(
      refreshToken,
      payload.idSession,
    );
    console.log("resultSession ",resultSession)
    return { refreshToken,idSession :payload.idSession,
            idUser :resultSession.user.id_user,
            username :resultSession.user.username,
            email :resultSession.user.email,
          };
  }
}