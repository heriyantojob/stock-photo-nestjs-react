import { Controller ,Get,UseGuards ,Request, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { logDebug } from 'src/utils/base/logDebug';
import UpdateUserProfileDto from './dto/update-user-profile.dto';
import UpdateUserProfilePasswordDto from './dto/update-user-profile-password.dto';

@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        
     
    ) {}

  

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    async profile(@Request() request) {
        let idUser=request.user.idUser

        let result =  await this.usersService.findOne(idUser)
        // logDebug(result)
        //return {idUser:idUser,idSession :request.user.idSession,data:result};
        return {idUser:idUser,idSession :request.user.idSession,data:result};
        // return req.user;
        //return req.headers['authorization']
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/profile')
    async updateProfile(@Request() request,@Body() updateUserProfileDto: UpdateUserProfileDto) {
        let idUser=request.user.idUser
   
     
 
        //let result =  await this.usersService.findOne(idUser,selectFields)
        let resulUpdate = await this.usersService.updateProfileByUser(updateUserProfileDto,idUser)
  
        // logDebug(result)
        //return {idUser:idUser,idSession :request.user.idSession,data:result};
        return {idUser:idUser,resulUpdate:resulUpdate};
        // return req.user;
        //return req.headers['authorization']
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/profile-password')
    async updateProfilePassword(@Request() request,@Body() updateUserProfilePasswordDto: UpdateUserProfilePasswordDto) {
        let idUser=request.user.idUser
   
     
 
        //let result =  await this.usersService.findOne(idUser,selectFields)
        let resulUpdate = await this.usersService.updateProfilePasswordByUser(updateUserProfilePasswordDto,idUser)
  
        // logDebug(result)
        //return {idUser:idUser,idSession :request.user.idSession,data:result};
        return {idUser:idUser,resulUpdate:resulUpdate};
        // return req.user;
        //return req.headers['authorization']
    }

}
