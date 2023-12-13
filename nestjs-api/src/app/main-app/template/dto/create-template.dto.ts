import {BaseTemplateDto} from "./base-template.dto"
export class CreateTemplateDto   {
    // firstName: string;
    // lastName: string;

    id_template ?: string;
    id_user : any;
    status : number;
    createdAt?: Date;

    type_template:string
  }