import { Injectable, UnauthorizedException  , HttpException,HttpStatus} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/app/main-app/users/user.entity';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    //super();
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {

    //throw new HttpException(email, HttpStatus.FORBIDDEN);
   // throw new UnauthorizedException(email);
    return  await this.authService.validateUser(email,password);

  }
}