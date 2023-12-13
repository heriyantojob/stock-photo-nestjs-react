import { integer } from 'aws-sdk/clients/cloudfront';
import {
    IsEmail,
    IsString,
    IsNotEmpty,
  
    IsNumber,
    IsIn
    
  } from 'class-validator';
import { BaseAdeminAdminDto } from './BaseAdeminAdminApp.dto';
 
  // import { CustomTextLength } from './CustomTextLength';

  
  export class UpdateAdminAdminAppDto extends BaseAdeminAdminDto {

    password?: string;
   
  }
  
  export default UpdateAdminAdminAppDto;

/*

https://dev.to/avantar/injecting-request-object-to-a-custom-validation-class-in-nestjs-5dal
https://github.com/AvantaR/nestjs-validation-tips/blob/main/injecting-request-object-to-a-custom-validation-class/src/decorators/inject.user.decorator.ts
https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc
https://www.youtube.com/watch?v=lmH2KaFgmCs
*/