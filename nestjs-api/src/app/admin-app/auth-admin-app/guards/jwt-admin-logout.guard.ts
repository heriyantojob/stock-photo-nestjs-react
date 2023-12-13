
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAdminLogoutGuard extends AuthGuard('jwt-admin-logout') {}