import {BaseUserDto} from "./base-user.dto"
import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string


  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  createdAt?: Date;

  }