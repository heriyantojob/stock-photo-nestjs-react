import { Controller,Post, Ip,Request } from '@nestjs/common';
import { UserSessionsService } from './user-sessions.service';
import { CreateUserSessionsDto } from './dto/create-user-sessions.dto';
import { v4 as uuidv4 } from 'uuid';
import  {IpAddress} from '../../../config/ip';
@Controller('user-sessions')
export class UserSessionsController {
    constructor(private userSessionsService: UserSessionsService) {}
//     @Post('test-token')
//     async createToken(@Ip() ip,@Request() req) {
    
//         //console.log("auth controller ",req)
//         //return "masuk login"
//         //let result = await.this.userSessionsService
//         let idSession: string = uuidv4();
//        // return 
//        // console.log("id session : "+idSession);
//         let createUserDto : CreateUserSessionsDto ={
//             id_user_session :idSession,
//             id_user:1,
//             // access_token:"asd",
//             refresh_token:"DSsd",
//             ip:ip,
//             user_agent: req.headers["user-agent"]

//         }
//         return this.userSessionsService.create(createUserDto);
//         //return "masuk Create Token"

    
//     }
}
