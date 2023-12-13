import { Injectable,ForbiddenException } from '@nestjs/common';
import {s3Config} from "../../../config/s3"

import {S3,Endpoint}  from 'aws-sdk';
import "dotenv/config"
import {TemplateFile} from "./template-file.entity"
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import {CreateTemplateFile} from "./dto/create-template-file.dto"


import * as slug from "slug"

import * as path from 'path';
import * as sharp from 'sharp';
import { UpdateTemplateFile } from './dto/update-template-file.dto';

const s3BucketName = process.env.AWS_BUCKET_NAME
const s3Folder = "template";

//tiny thumbnail small medium large
const fileListSize ={
  tiny : {width:100},
  thumbnail: {width:320},
  small : {width:640},
  medium : {width:1280},
  large : {width:1920}, 
}
@Injectable()
export class TemplateFileService {
  constructor(
    @InjectRepository(TemplateFile)
      private readonly templateFileRepository: Repository<TemplateFile>,
  ) {}
    // async findTemplateUploadNew(params:type) => {
      
    // }

   
    


    async  create(createTemplateFile: CreateTemplateFile): Promise<TemplateFile> {
    
      return this.templateFileRepository.save(createTemplateFile);
     // return this.templateRepository.save(createEstimateDto,{template});
     
    }

    async  update(updateTemplateFile: UpdateTemplateFile): Promise<TemplateFile> {
    
      return this.templateFileRepository.save({
        ...updateTemplateFile
      });
     // return this.templateRepository.save(createEstimateDto,{template});
     
    }

    async findTemplateFileList( addWhere={},
                                        addSelect= {
                                          id_template_file: true,
                                          template: {},
                                        },
                                      ): Promise<TemplateFile[]> {
      // return this.templateRepository.find();
      // console.log("addWhere ",addWhere['templateFile'])
      return this.templateFileRepository.find({ 
        // select: {
        //   id_template_file: true,
        //   template: {},
        // },

          select: addSelect,
  
         relations: ['template'],
          where :addWhere
        //  where: {
        //     ...addWhere['templateFile'],
        //     template: {

        //         id_template: id_template,
        //     },
        //   },
      });
    }
//upload and download file s3

    async uploadFileToS3(fileBuffer,fileName) {
        
        
      const uploadResult = await s3Config.upload({
        Bucket: s3BucketName,
        Body: fileBuffer,
        Key: fileName
        // Key: `${id_template_file}-${filename}`
      })
        .promise();
    

      return uploadResult;
    }


    async downloadFileToS3(fileKey) {
        
        
      const downloadParams = {
        Key: fileKey,
        Bucket: s3BucketName
      }
      try {
        await s3Config.headObject(downloadParams).promise();
        const readStream = await s3Config.getObject(downloadParams).createReadStream()
        return readStream;
      
      } catch (error) {
       // return res.status(404).json({"error":error})
        throw new ForbiddenException('Not found');
        // if (error.name === 'NotFound') {
        //   // Handle no object on cloud here...
        // } else {
        //   // Handle other errors here....
        // }
     
      }
    }


   

}
