import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Request } from 'express';
// import { Ad } from '../../users/users.service';
// import { UserSessionsService } from '../../user-sessions/user-sessions.service';
import TokenPayload from './tokenPayload.interface';
import { AdminService } from 'src/app/main-app/admin/admin.service';
import { AdminSessionService } from 'src/app/main-app/admin-session/admin-session.service';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
@Injectable()
export class JwtAdminRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-admin-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
    private readonly adminSessionService: AdminSessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // cookieParser(this.configService.get('JWT_COOKIE_REFRESH_ADMIN_SECRET'))(request, null, () => {});

          // const refreshToken = request.signedCookies['refreshTokenManageAdmin'];
          const refreshToken = this.getRefreshToken(request)
          // console.log( "requestCookie",refreshToken)
          return refreshToken;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET_REFRESH_ADMIN'),

      // secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }
  getRefreshToken(request: Request) {
    cookieParser(this.configService.get('JWT_COOKIE_REFRESH_ADMIN_SECRET'))(request, null, () => {});

    const refreshToken = request.signedCookies[this.configService.get('JWT_COOKIE_REFRESH_ADMIN')];
   // const refreshToken = req.cookies['refreshToken'];
    return refreshToken;
  }
  async validate(request: Request, payload) {
    // cookieParser(this.configService.get('JWT_COOKIE_REFRESH_ADMIN_SECRET'))(request, null, () => {});

    //const refreshToken = request.signedCookies[this.configService.get('JWT_COOKIE_REFRESH_ADMIN_SECRET')];
    const refreshToken = this.getRefreshToken(request)
    // return  payload
    // return { payload: payload };
    const resultSession =await this.adminSessionService.findOneIfRefreshTokenMatches(
      refreshToken,
      payload.idSession,
    );

    return { refreshToken,idSession :payload.idSession,
            id_admin :resultSession.admin.id_admin,
            username :resultSession.admin.username,
            email :resultSession.admin.email,
          };
  }
}