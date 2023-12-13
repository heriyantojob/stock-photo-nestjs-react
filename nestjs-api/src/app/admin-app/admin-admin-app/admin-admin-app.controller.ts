import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AdminService } from 'src/app/main-app/admin/admin.service';
import { routesAdminApp } from 'src/config/routes';
import { PaginationParams } from 'src/utils/types/paginationParams';
import { JwtAdminAuthGuard } from '../auth-admin-app/guards/jwt-admin-auth.guard';
import InsertAdminAdminAppDto from './dto/InsertAdminAdminApp.dto';
import UpdateAdminAdminAppDto from './dto/UpdateAdminAdminApp.dto';
@Controller(routesAdminApp+'/admin')
export class AdminAdminAppController {
    constructor(
        private readonly adminService: AdminService,
     
    ) {}

    @UseGuards(JwtAdminAuthGuard)
    @Get('')
    async getAll(
        @Req() request,
        // @Query('search') search: string,
        @Query() { page=1, limit=2 }: PaginationParams,
    ) {
        const offset = limit * (page-1);
        // request.user
        let pageQuery = {offset, limit}
        let resultUserPagination =   await this.adminService
        .getManyByAdmin(
          pageQuery,
          {}
        )
        let resultAdmin= resultUserPagination[0]

        return {  
            data :resultAdmin, 
            "meta": {
              "page": page,
              limit,
              "pageCount": Math.ceil(resultUserPagination[1] / limit),
              "total": resultUserPagination[1],
            
            }
          }
    }

    @UseGuards(JwtAdminAuthGuard)
    @Get('/:id')
    async getOne(  @Req() request,@Param('id') id: string) {
        let resultUser =   await this.adminService
        .getOne(
            id
        )
        return resultUser

    }

    @Patch('/:id')
    async update(  @Req() request,@Param('id') id: string,@Body() updateUserAdminAppDto: UpdateAdminAdminAppDto) {

        let resultUser =   await this.adminService
        .updateAdminByadmin(
            updateUserAdminAppDto,
            id
        )
        return {message:"Admin Sucess Update"} 

    }


    @Post('')
    async insert( @Body() insertAdminAdminAppDto: InsertAdminAdminAppDto) {

        let resultUser =   await this.adminService
        .inserAdminByadmin(
            insertAdminAdminAppDto
        )
        
        return {message:"Admin Sucess Save"} 

    }


}
