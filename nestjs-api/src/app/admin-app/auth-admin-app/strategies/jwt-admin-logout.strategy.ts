import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import TokenPayload from './tokenPayload.interface';
import { AdminSessionService } from 'src/app/main-app/admin-session/admin-session.service';
import { AdminService } from 'src/app/main-app/admin/admin.service';
import * as cookieParser from 'cookie-parser';
@Injectable()
export class JwtAdminLogoutStrategy extends PassportStrategy(
  Strategy,
  'jwt-admin-logout',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
    private readonly adminSessionService: AdminSessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // return request?.cookies?.refreshToken;
          cookieParser(this.configService.get('JWT_COOKIE_REFRESH_ADMIN_SECRET'))(request, null, () => {});

          const refreshToken = request.signedCookies['refreshTokenManageAdmin'];
          // console.log( "requestCookie",refreshToken)
          return refreshToken;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET_REFRESH_ADMIN'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload) {
    cookieParser(this.configService.get('JWT_COOKIE_REFRESH_ADMIN_SECRET'))(request, null, () => {});
    //const refreshToken = request.cookies?.refreshToken;
    const refreshToken = request.signedCookies['refreshTokenManageAdmin'];

    // console.log("refreshToken logout",refreshToken)
 
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