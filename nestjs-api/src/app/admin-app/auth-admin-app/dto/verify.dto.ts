import {

    IsString,

    
  } from 'class-validator';
 
  // import { CustomTextLength } from './CustomTextLength';

  
  export class VerifyDto {
    @IsString()
    token: string;
   
  }
  
  export default VerifyDto;