import { Controller,Get ,Req,Res,NotFoundException,Param,Query} from '@nestjs/common';
import {TemplateFileService} from "./template-file.service"
import { S3 } from 'aws-sdk';
import {s3Config} from "../../../config/s3"
import { Response } from 'express';
// import { ConfigService } from '@nestjs/config';
// import { getFileInfo } from 'prettier';

const s3BucketName = process.env.AWS_BUCKET_NAME

@Controller('template-file')
export class TemplateFileController {
    constructor(

        private readonly templateFileService: TemplateFileService,
        // private readonly configService: ConfigService
    ) {}
    //query download  = true
    @Get(":filename")
    async  openFile(@Res() response: Response,@Param() params,@Query() query) {
      

  
           //let fileKey = "template/0031477b-7eaa-45b7-9a6c-c1e8d5e318d8/banner-blog-3d83325c-8f96-4479-ac5a-897469d02c87.png"
 
           let fileKey = "template/" + params.filename;
           let options = { Bucket: s3BucketName, Key: fileKey };
           
            try {
                // Check if the file exists before creating the read stream
                let headCode = await s3Config.headObject(options).promise();
            } catch (error) {
                // If the file does not exist, return a 404 response
                return response.status(404).send({ message: "The requested file could not be found." });
            }

           try {
             let fileStream = s3Config.getObject(options).createReadStream();
           
             if (query?.download) {
               response.attachment(fileKey);
             }
           
             return fileStream.pipe(response);
           } catch (error) {
             return response.status(404).send({ message: "The requested file could not be found." });
           }

    }

}
