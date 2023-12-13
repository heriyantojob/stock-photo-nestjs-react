import { Controller, UseGuards,Get ,Req, Query, Param, Patch, Body} from '@nestjs/common';
import { UsersService } from 'src/app/main-app/users/users.service';
import { routesAdminApp } from 'src/config/routes';
import { PaginationParams } from 'src/utils/types/paginationParams';
import { JwtAdminAuthGuard } from '../auth-admin-app/guards/jwt-admin-auth.guard';
import UpdateUserAdminAppDto from './dto/UpdateUserAdminApp.dto';
import { UserAdminAppParams } from './type/UserAdminAppParams';
@Controller(routesAdminApp+'/user')
export class UserAdminAppController {
    constructor(
        private readonly usersService: UsersService,
        
     
    ) {}


    @UseGuards(JwtAdminAuthGuard)
    
    @Get('')
    async getNew(
        @Req() request,
        // @Query('search') search: string,
        @Query() { page=1, limit=2 }: PaginationParams,
        @Query() {   email,status,contributor,contributor_unlimited}:UserAdminAppParams 
    ) {

        // // console.log("email"+email)
        // return email
        const offset = limit * (page-1);
        // request.user
        let pageQuery = {offset, limit}
        let resultUserPagination =   await this.usersService
        .getManByAdmin(
          pageQuery,
          { email,status,contributor,contributor_unlimited}
        )
        let resultUser= resultUserPagination[0]

        return {  
            data :resultUser, 
            "meta": {
              "page": page,
              limit,
              "pageCount": Math.ceil(resultUserPagination[1] / limit),
              "total": resultUserPagination[1],
            
            }
          }
    }

    @Get('/:id')
    async getOne(  @Req() request,@Param('id') id: string) {
        let resultUser =   await this.usersService
        .findOne(
            id
        )
        return resultUser

    }
    @Patch('/:id')
    async update(  @Req() request,@Param('id') id: string,@Body() updateUserAdminAppDto: UpdateUserAdminAppDto) {

        let resultUser =   await this.usersService
        .updateUserByadmin(
            updateUserAdminAppDto,
            id
        )

        return {message:"User Sucess Update"} 
      

    }
}
