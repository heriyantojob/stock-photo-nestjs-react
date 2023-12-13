import { integer } from 'aws-sdk/clients/cloudfront';
import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    Matches,Validate,

    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    IsNumber,IsIn
    
  } from 'class-validator';
import { BaseAdeminAdminDto } from './BaseAdeminAdminApp.dto';
 
  // import { CustomTextLength } from './CustomTextLength';

  
  export class InsertAdminAdminAppDto extends BaseAdeminAdminDto {

  
    // @IsEmail()
    // email: string;
  
    // username?: string;

    // @IsString()
    // name: string;

    // phone?: string;

    // @IsIn([0,1,2,"0","1","2"])
    // @IsNotEmpty()
    // // @MinLength(2)
    // status: number;

    // @IsNumber()
    // id_admin_role: number;

    @IsString()
    password: string;
  
  
    // @IsString()
    // @IsNotEmpty()
    // @MinLength(7)
    // password: string;


  
   
  }
  
  export default InsertAdminAdminAppDto;

/*

https://dev.to/avantar/injecting-request-object-to-a-custom-validation-class-in-nestjs-5dal
https://github.com/AvantaR/nestjs-validation-tips/blob/main/injecting-request-object-to-a-custom-validation-class/src/decorators/inject.user.decorator.ts
https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc
https://www.youtube.com/watch?v=lmH2KaFgmCs
*/