
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAdminRefreshGuard extends AuthGuard('jwt-admin-refresh') {}