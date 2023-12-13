import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserOtpDto {
    // @IsNotEmpty()

    id_user_otp?:string
    @IsEmail()
    email: string

    phone?: string
    
    type_otp:string
    
    token :string

    otp:string

    status:number
    expired_at?:Date
    id_user:any
    createdAt?: Date;
}