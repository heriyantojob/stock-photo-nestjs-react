import { User } from '../../users/user.entity';

export class CreateAdminSessionsDto   {
    id_admin_session?: string;
    id_admin:  any ;
    // access_token: string;
    // access_token_expired?: Date;

    // @IsNotEmpty()
    refresh_token: string;
    refresh_token_expired?: Date;

    ip: string;
    user_agent: string;


    created_at?: Date;
    updated_at?: Date;
  }