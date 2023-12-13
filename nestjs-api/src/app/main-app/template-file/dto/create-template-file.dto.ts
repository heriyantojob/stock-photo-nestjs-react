import {BaseTemplateFileDto} from "./base-template-file.dto"
export class CreateTemplateFile   {
 // @IsNotEmpty()
    // id_template_file : number;
    template : any;
    // template: TemplateFk;
    file_name ?:string;

    file_mime?:string;
    in_download :number;   
    in_preview:number;
    file_width?:number;
    file_height?:number;
    file_slug ?: string;
    file_ext ?: string;
    file_size ?: number ;

    file_list ?: any;


    createdAt?: Date;
  }