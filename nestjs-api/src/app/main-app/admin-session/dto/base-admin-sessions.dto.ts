import { Type } from 'class-transformer';
// import { IsInt, IsNotEmpty } from 'class-validator';
export class BaseAdminSessionsDto {
    // @IsNotEmpty()
    id_user_session?: string;
    id_user:  number;
    // access_token: string;
    // access_token_expired?: Date;

    // @IsNotEmpty()
    refresh_token: string;
    refresh_token_expired?: Date;

    ip: string;
    user_agent: string;


    createdAt?: Date;
  }