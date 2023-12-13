  import { Type } from 'class-transformer';
// import { IsInt, IsNotEmpty } from 'class-validator';
export class BaseTemplateDto {
    // @IsNotEmpty()
    id_template ?: string;
    id_user : any;
    status : number;
    createdAt?: Date;
  }