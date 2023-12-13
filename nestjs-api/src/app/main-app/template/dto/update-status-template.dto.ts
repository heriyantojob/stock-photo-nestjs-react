import {BaseTemplateDto} from "./base-template.dto"
import {  IsNotEmpty ,IsNumber,IsArray} from 'class-validator';
export class UpdateStatusTemplateDto {
    // firstName: string;
    // lastName: string;
    
    @IsNotEmpty()
    title: string;
    @IsNumber()
    update_status: number;
    @IsNotEmpty()
    description: string;

    @IsArray()
    tags:Array<string>
    
  }