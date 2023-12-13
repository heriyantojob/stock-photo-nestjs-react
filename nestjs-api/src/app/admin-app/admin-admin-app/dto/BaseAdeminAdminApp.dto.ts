import { Type } from 'class-transformer';
// import { IsInt, IsNotEmpty } from 'class-validator';
import {
    IsEmail,
    IsString,
    IsNotEmpty,
  
    IsNumber,
    IsIn
    
  } from 'class-validator';
export class BaseAdeminAdminDto {
    @IsEmail()
    public  email: string;
  
    public  username?: string;

    @IsString()
    @IsNotEmpty()
    public  name: string;

    public  phone?: string;

    // @IsIn([0,1,2,"0","1","2"])
    @IsIn([0,1,2,"0","1","2"])
    @IsNotEmpty()
    // @MinLength(2)
    public  status: number;

    @IsNumber()
    public  id_admin_role: number;
  }