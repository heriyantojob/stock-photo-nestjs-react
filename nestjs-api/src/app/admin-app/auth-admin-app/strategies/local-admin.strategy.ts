import { Injectable, UnauthorizedException  , HttpException,HttpStatus} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/app/main-app/users/user.entity';
import { AuthAdminAppService } from '../auth-admin-app.service';


@Injectable()
export class LocalAdminStrategy extends PassportStrategy(Strategy,"local-admin-auth") {
  constructor(private readonly authAdminAppService: AuthAdminAppService) {
    //super();
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {

    //throw new HttpException(email, HttpStatus.FORBIDDEN);
   // throw new UnauthorizedException(email);
    return  await this.authAdminAppService.validateAdmin(email,password);

  }
}