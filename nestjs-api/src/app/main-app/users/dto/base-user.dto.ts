import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
export class BaseUserDto {
    // @IsNotEmpty()
    @IsEmail()
    email: string


    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
    createdAt?: Date;
  }