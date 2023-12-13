import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards,NotFoundException } from '@nestjs/common';
import { TemplateFileService } from 'src/app/main-app/template-file/template-file.service';
import { TEMPLATE_FILE_ADD_SELECT_NEW } from 'src/app/main-app/template-file/variable/templateFileAddSelect';
import { TemplateService } from 'src/app/main-app/template/template.service';
import { TempalateParams } from 'src/app/main-app/template/type/TempalateParams';
import { PaginationParams } from 'src/utils/types/paginationParams';
import { templateFileAddWhereByIdTemplate } from '../../main-app/template/variable/templateFileAddWhere';
import { routesAdminApp } from 'src/config/routes';

import {  templateAddSelectInPublic } from 'src/app/main-app/template/variable/templateAddSelect';
import { JwtAdminAuthGuard } from '../auth-admin-app/guards/jwt-admin-auth.guard';
import { UpdateTemplateInAdminDto } from './dto/update-template-in-admin.dto';
import { TemplateAdminAppService } from './template-admin-app.service';
import { TempalateAdminAppParams } from './type/TempalateAdminAppParams';
@Controller(routesAdminApp+'/template')
export class TemplateAdminAppController {
    constructor(
        private readonly templateFileService: TemplateFileService,
        private readonly templateService :TemplateService,
        private readonly templateAdminAppService :TemplateAdminAppService
    ) {}

    @UseGuards(JwtAdminAuthGuard)
    @Get('')
    async getAllQueryBuilder(  
            @Req() request,
            @Query() { page=1, limit=2 }: PaginationParams,
            @Query() { email_user,status,keyword,type_template }:TempalateAdminAppParams 
        ) {
           
          keyword = keyword||""

          const offset = limit * (page-1);
          
          let pageQuery = {offset, limit}
          let addWhere={email_user,status,keyword,type_template}
          console.log("addWhere getAllQueryBuilder ",addWhere)
        
          let resultTemplatePagination =   await this.templateService
                                                .getManyForAdmin(
                                                  pageQuery,
                                                  addWhere
                                                )
          let resultTemplate= resultTemplatePagination[0]
  
          for(let templateIndex = 0; templateIndex < resultTemplate.length; templateIndex++){
      
            // console.log("resultTemplate ",resultTemplate[templateIndex].id_template)
          
            let addWhereTemplateFile =templateFileAddWhereByIdTemplate(   resultTemplate[templateIndex].id_template,{templateFile:{in_preview:1}})
            // let addWhereTemplateFile =templateFileAddWhereByIdTemplate(   resultTemplate[templateIndex].id_template)
            let  resultDataFile   = await this.templateFileService.findTemplateFileList(
                                              addWhereTemplateFile,
                                              TEMPLATE_FILE_ADD_SELECT_NEW
  
                                          );
  
            resultTemplate[templateIndex]["templateFileList"] = resultDataFile
            //console.log(resultDataFile)
  
          }
      
  
        return {  
                  data :resultTemplate, 
                  "meta": {
                    "page": page,
                    limit,
                    "pageCount": Math.ceil(resultTemplatePagination[1] / limit),
                    "total": resultTemplatePagination[1],
                  
                  }
                }

    }

    @Get('/:id')
    async getOne(  @Req() request,@Param('id') id: string) {
      // return slug;

      let addWhereTemplate =  {
        id_template:id,
       
      }
   
     //  this.templateService.findTemplateUploadNew(reqUser);
      let resultTemplate:any =  await this.templateService
                                            .findOneCustom(
                                                templateAddSelectInPublic,
                                                addWhereTemplate
                                             );

      if(resultTemplate){
        let addWhereTemplateFile =templateFileAddWhereByIdTemplate(   resultTemplate.id_template)
        // let addWhereTemplateFile =templateFileAddWhereByIdTemplate(   resultTemplate[templateIndex].id_template)
        let  resultDataFile   = await this.templateFileService.findTemplateFileList(
                                          addWhereTemplateFile,
                                          TEMPLATE_FILE_ADD_SELECT_NEW
  
                                      );
  
        resultTemplate["templateFileList"] = resultDataFile
        return resultTemplate

      }else{
        throw new   NotFoundException()
      }


    }
    @UseGuards(JwtAdminAuthGuard)
    @Patch(':id')
    async updateChangeStatus(@Param('id') id,@Req() request,@Body() updateTemplateInAdminDto: UpdateTemplateInAdminDto){
      
        //return   updateStatusTemplateDto;
        let reqUser=request.user
       // return reqUser
        let isEqualUser = true;
        return this.templateService.updateAdmin(id,updateTemplateInAdminDto);
        // //return request.body;
        // return "update status"
    }

    
}
