import { Controller ,Get,Post,Request,UploadedFile,UseGuards, Req,Res,UseInterceptors,Query} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {TemplateService} from "../template/template.service"
import {TemplateFileService} from "../template-file/template-file.service"
import {TemplateUploadService} from "./template-upload.service"
//import {TemplateFileService} from "../template-file/template-file.service"
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TEMPLATE_FILE_ADD_SELECT_NEW,TEMPLATE_FILE_ADD_SELECT_ALL } from '../template-file/variable/templateFileAddSelect';
import { templateFileAddWhereByIdTemplate } from '../template-file/variable/templateFileAddWhere';


import {  templateAddSelectAll } from '../template/variable/templateAddSelect';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as sharp from 'sharp';
import slug from "slug"
import {SharpPipe} from "./SharpPipe"
import { PaginationParams } from 'src/utils/types/paginationParams';

@Controller('template-upload')
export class TemplateUploadController {
    constructor(
        private readonly templateUploadService: TemplateUploadService,
        private readonly templateFileService: TemplateFileService,
        private readonly templateService :TemplateService
    ) {}
    @UseGuards(JwtAuthGuard)
    @Get('new')
    async getNew(
        @Req() request,
        @Query() { page=1, limit=6 }: PaginationParams,
        @Query() { status=1 },
        // @Query('search') search: string,
    ) {
     
     // return "Get New"
     const offset = limit * (page-1);

     let reqUser=request.user
     let addWhereTemplate =  {
        status:status,
        user: {
            id_user: reqUser.idUser,
          
        },
      }
      let pageQuery = {offset, limit}
     //  this.templateService.findTemplateUploadNew(reqUser);
      let resultTemplatePagination :any =  await this.templateService
                                            .findAndCountCustom(
                                                pageQuery,
                                                templateAddSelectAll,
                                                addWhereTemplate,
                                                {
                                                  created_at: "ASC"  
                                                }
                                                
                                             );


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
    

      return {data :resultTemplate, 
          "meta": {
            "page": page,
            limit,
            "pageCount": Math.ceil(resultTemplatePagination['total'] / limit),
            "total": resultTemplatePagination['total'],
         
          }
  // total:resultTemplatePagination['total']
         }

    }

    @UseGuards(JwtAuthGuard)
    @Get('update-status')
    async getDate(@Req() request) {
      return "Get Update"

    }
    @UseGuards(JwtAuthGuard)
    @Post('new')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@Req() request, @UploadedFile() file: Express.Multer.File) {

        let reqUser={...request.user}
        let checkUpload = await this.templateUploadService.checkFile(file);
        let createTemplateAdd = {type_template:checkUpload.type_template}

        let resultTemplate = await this.templateUploadService.createTemplate(reqUser,createTemplateAdd);
        let result = this.templateUploadService.addFile(file,resultTemplate);
        return result;
        //return {message:"Success"}
        // // return file
        // return { "fileBuffer":file.buffer, "fileOriginal":file.originalname}
        // return "masuk upload"
    }
   

 

  // @UseGuards(JwtAuthGuard)
  // @Post('upload-test')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadTest(@Req() request, @UploadedFile() file: Express.Multer.File) {
  //   // return "berhasil"
  //   const originalName = path.parse(file.originalname).name;
  //   const filename = Date.now() + '-' + originalName ;

  //     let sharpResize = await sharp(file.buffer)
  //     .resize(800)
  //     // .toFile(path.join('uploads', filename));
  //     .toBuffer();



  //     console.log(sharpResize);
  //     return "berhasil"

  // }




}
