
import {  IsNotEmpty ,IsNumber,IsArray, IsIn} from 'class-validator';
export class UpdateTemplateInAdminDto {
    // firstName: string;
    // lastName: string;
    @IsNotEmpty()
    title: string;
    
    @IsIn([1,2,3,4,"1","2","3","4"])
    status: number;
    
    @IsNotEmpty()
    description: string;

    @IsArray()
    tags:Array<string>


    
  }