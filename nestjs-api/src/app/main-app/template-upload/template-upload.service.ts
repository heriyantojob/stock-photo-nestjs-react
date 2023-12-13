import { Injectable,BadRequestException,ForbiddenException } from '@nestjs/common';
import {s3Config} from "../../../config/s3"
import { v4 as uuidv4 } from 'uuid';
import {S3,Endpoint}  from 'aws-sdk';
import "dotenv/config"
import { TemplateFileService } from 'src/app/main-app/template-file/template-file.service';
import { TemplateService } from 'src/app/main-app/template/template.service';

const s3BucketName = process.env.AWS_BUCKET_NAME
import * as slug from "slug"
import * as sharp from 'sharp';
const s3Folder = "template";

//tiny thumbnail small medium large
const fileListSize ={
  // tiny : {width:100},
  // preview: {width:320},
  tiny : {width:320},
  small : {width:640},
  medium : {width:1280},
  large : {width:1920}, 
}


@Injectable()
export class TemplateUploadService {

    constructor(

      private readonly templateFileService: TemplateFileService,
      private readonly templateService: TemplateService,
      
  ) {}

      async checkFile(file:Express.Multer.File) {
    
        const [, fileExt] = file.mimetype.split('/');
        // let fileOriginalname = slug(file.originalname)
        let fileSplit =this.fileSplit(file.originalname) 
        if (['jpeg', 'jpg', 'png'].includes(fileExt)) {

          return {type_template:"photos"}
        }
        else if (['gif'].includes(fileExt)&& ['.gif'].includes( fileSplit.fileExt)) {
          //throw new ForbiddenException("png");
          return {type_template:"gif"}
        }
        
        
        else if(['svg+xml'].includes(fileExt) && ['.svg'].includes( fileSplit.fileExt)){
          return {type_template:"vectors"}
        }

        // else if(['svg+xml'].includes(fileExt)){

        // }

        
        else{
          throw new BadRequestException(["file not allowed"]);
        }
         

        
        // && ['svg'].includes( fileSplit.fileExt)


      }
      async createTemplate(reqUser:any,createTemplateAdd){
        let id_template: string = uuidv4();
        const createTemplateData= {
            id_user:reqUser.idUser,
            status:1,
            id_template,
            // template_slug:id_template,
            type_template:createTemplateAdd.type_template
        }

     // return data

       let resulTemplate =  await this.templateService.create(createTemplateData);
 
       return resulTemplate
      }

    async addFile(file:Express.Multer.File,resultTemplate) {

      let templateFileInsert = {
   
        in_download :1,    
        in_preview:1,
        template:resultTemplate
   
      }
    

      let resultInsert = await this.templateFileService.create(templateFileInsert);
      if(!resultInsert)  throw new BadRequestException(["Failed to Upload File"]);

      // throw new BadRequestException([resultInsert.id_template_file]);
      let id_template_file: number =resultInsert.id_template_file;
       
      

       
     //`````set Variable
          slug.charmap['.'] = '.'
          let fileOriginalname = slug(file.originalname)
    
          let fileSplit =this.fileSplit(fileOriginalname) 
     
          let updateData = {
            file_width: null,file_height:null,file_slug:null,  file_ext : fileSplit.fileExt,file_size:file.size,file_list:null

          }
  
            
          const [, fileExt] = file.mimetype.split('/');

      //`````upload files to s3 object storage
          updateData.file_slug =`${fileSplit.fileName+"-"+id_template_file+fileSplit.fileExt}`
         // let uploadKey =`${s3Folder}/${id_template}/${updateData.file_slug}`
          let uploadKey =`${s3Folder}/${updateData.file_slug}`
          await this.uploadFileToS3(file.buffer  ,uploadKey);
         
          //`` check if upload file is images ,svg and resize
          if (['jpeg', 'jpg', 'png',"svg+xml","gif"].includes(fileExt) &&  ['.jpeg', '.jpg', '.png','.svg',".gif"].includes( fileSplit.fileExt)) {
            //``set sharp and check image width
            let fileExtResize = fileSplit.fileExt
            if(fileSplit.fileExt===".svg") fileExtResize=".png"
            let fileSharpOri = await sharp(file.buffer)

            let fileSharpOriMetadata = await fileSharpOri.metadata();
            // console.log("fileSharpOriMetadata ",fileSharpOriMetadata)
            updateData.file_width =  fileSharpOriMetadata.width
            updateData.file_height =  fileSharpOriMetadata.height
            updateData.file_list={}
            for (const key in fileListSize) {
              if (fileListSize.hasOwnProperty(key)) {
                
                let  fileResize =(["gif"].includes(fileExt)) &&  [".gif"].includes( fileSplit.fileExt)
                                  ?await sharp(file.buffer, { animated: true }).resize(fileListSize[key].width).gif() 
                                    : await sharp(file.buffer).resize(fileListSize[key].width)

           
                
                  let  {data:fileBufferResize, info:fileInfoResize} =await fileResize.toBuffer({ resolveWithObject: true });
                  
                //let fileSlugNameResize =`${fileSplit.fileName+"-"+key+"-"+id_template_file+fileSplit.fileExt}`

                let fileSlugNameResize =`${fileSplit.fileName+"-"+key+"-"+id_template_file+fileExtResize}`
                let fileKeyS3Reize=`${s3Folder}/${fileSlugNameResize}`
                await this.uploadFileToS3(fileBufferResize  ,fileKeyS3Reize);
                updateData.file_list[`${key}`] ={
                 
                  file_slug:fileSlugNameResize,
                  file_ext:fileExtResize,
                  // file_size:0,
                  file_width : fileInfoResize.width,
                  file_height : fileInfoResize.height,
                  file_size: fileInfoResize.size,
              
                }
              }
            }
            
          }

        

      //`````save to database
          let templateFile = {
            id_template_file:id_template_file,
            file_name :fileOriginalname,
            file_mime:file.mimetype,
            in_download :1,    
            in_preview:1,
            file_width:updateData.file_width,
            file_height:updateData.file_height,
            file_slug : updateData.file_slug,
            file_ext : updateData.file_ext,
            file_size : updateData.file_size  ,
            file_list : updateData.file_list
          }

        
          return await this.templateFileService.update(templateFile);
          //return "berhasil"
        
        }

        fileSplit(fileOriginalName){
          let text = fileOriginalName;
          let lastIndex = text.lastIndexOf(".");
          let fileExt:string = text.substring(lastIndex)
          let fileName :string = text.substring(0, lastIndex)
          // let hasil= fileName + '-fx' + fileType;
          return {fileName, fileExt}
        }

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



      // async uploadPublicFile(dataBuffer: Buffer, filename: string) {
     
      
      //   const uploadResult = await s3Config.upload({
      //     Bucket: s3BucketName,
      //     Body: dataBuffer,
      //     Key: `${uuidv4()}-${filename}`
      //   })
      //     .promise();
     
   
      //   return uploadResult;
      // }

}
