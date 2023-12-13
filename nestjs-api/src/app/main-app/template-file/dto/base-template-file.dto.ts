import { Type } from 'class-transformer';
// import { IsInt, IsNotEmpty } from 'class-validator';
export class BaseTemplateFileDto {
    // @IsNotEmpty()
    id_template_file ?: string;
    // template : any;
    // template: TemplateFk;
    file_name :string;

    file_mime:string;
    in_download :number;   
    in_preview:number;
    file_width:number;
    file_height:number;
    file_slug : string;
    file_ext : string;
    file_size : number ;

    file_list : any;


    createdAt?: Date;
  }
  class TemplateFk {
    id_template: string;
    
}