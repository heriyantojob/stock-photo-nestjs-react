import { Controller, Get,Req,Patch,UseGuards,Body,Param,Delete,BadRequestException,Query ,NotFoundException} from '@nestjs/common';
import { TemplateService } from './template.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateStatusTemplateDto } from './dto/update-status-template.dto';
import { PaginationParams } from 'src/utils/types/paginationParams';
import {  templateAddSelectInPublic } from './variable/templateAddSelect';
import { templateFileAddWhereByIdTemplate } from './variable/templateFileAddWhere';
import {TemplateFileService} from "../template-file/template-file.service"
import { TEMPLATE_FILE_ADD_SELECT_NEW,TEMPLATE_FILE_ADD_SELECT_ALL } from '../template-file/variable/templateFileAddSelect';
import { Like } from 'typeorm';
 import {TempalateParams} from "./type/TempalateParams"
import { TempalateAdminAppParams } from 'src/app/admin-app/template-admin-app/type/TempalateAdminAppParams';
//delete user lock by user id
@Controller('template')

export class TemplateController {
    constructor(
        private readonly templateFileService: TemplateFileService,
        private readonly templateService :TemplateService
    ) {}

    @Get('')
    async getAllQueryBuilder(  
      @Req() request,
        @Query() { page=1, limit=2 }: PaginationParams,
        @Query() { type,keyword }:TempalateParams) {
      
      

        const offset = limit * (page-1);
        
        let pageQuery = {offset, limit}
        let addWhere={keyword,type}
        let resultTemplatePagination =   await this.templateService
                                              .getManyForPublic(
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
    
        if(!resultTemplate.length ){
      
          throw new   NotFoundException()
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
    @Get('orm')
    async getAllOrm(  
      @Req() request,
        @Query() { page=1, limit=20 }: PaginationParams,
        @Query() { type,keyword }:TempalateParams) {
      
          keyword = keyword||""
          console.log("keyword",keyword)

 
     // return "Get New"

     //===pagination
     const offset = limit * (page-1);
     let pageQuery = {offset, limit}
    //  let addWhereTemplate = {
    //   status:3,
    //   type_template:type,}
    let addWhereTemplate=[]
     //query where
     if(keyword){
      addWhereTemplate = [

        {
          status:3,
          type_template:type,
          title : Like(`%${keyword}%`),
         
        },
   
      ]

     }else{
        addWhereTemplate = [
            {
              status:3,
              type_template:type
            },
        
        ]

     }
     
     
      // if(keyword){
      //   addWhereTemplate['tags']=keyword
      // }
   
      console.log(addWhereTemplate)
     //  this.templateService.findTemplateUploadNew(reqUser);
      let resultTemplatePagination :any =  await this.templateService
                                            .findAndCountCustom(
                                                pageQuery,
                                                templateAddSelectInPublic,
                                                addWhereTemplate,
                                                {
                                                  created_at: "ASC"  
                                                }
                                                
                                             );


      console.log("resultTemplatePagination ",resultTemplatePagination)


      let resultTemplate :any  = resultTemplatePagination['results']

      
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
      console.log("masuk error" ,resultTemplate.length)
      if(resultTemplate.length > 0 ){
      
        throw new   NotFoundException()
      }
      

      return {data :resultTemplate, 
          "meta": {
            "page": page,
            limit,
            "pageCount": Math.ceil(resultTemplatePagination['total'] / limit),
            "total": resultTemplatePagination['total'],
         
          }

         }

    }

    @Get('/:id')
    async getOne(  @Req() request,@Param('id') id: number) {
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
        return {data:resultTemplate}

      }else{
        throw new   NotFoundException()
      }


    }
    //update and post

    @UseGuards(JwtAuthGuard)
    @Patch('update-status/:id')
    async updateChangeStatus(@Param('id') id,@Req() request,@Body() updateStatusTemplateDto: UpdateStatusTemplateDto){
        //return   updateStatusTemplateDto;
        let reqUser=request.user
       // return reqUser
        let isEqualUser = true;
        return this.templateService.updateStatus(id,updateStatusTemplateDto,reqUser,isEqualUser);
        // //return request.body;
        // return "update status"
    }


    @UseGuards(JwtAuthGuard)
    @Delete('')
    async delete(@Param('id') id,@Req() request){
       // return request.body.id;
        if(request.body.id){
            let reqUser=request.user
           
            // return reqUser
             let isEqualUser = true;
            let result = await this.templateService.delete(request.body.id,reqUser,isEqualUser);
            return {"message":"Successfully deleted"}
        }
        throw new BadRequestException(["Failed to delete"]);

        //return   updateStatusTemplateDto;
        
        // //return request.body;
        // return "update status"
    }



    
}

/*

https://stackoverflow.com/questions/71997963/perform-a-typeorm-find-search-operation-for-matching-array-of-json
penjelasan query builder json
*/