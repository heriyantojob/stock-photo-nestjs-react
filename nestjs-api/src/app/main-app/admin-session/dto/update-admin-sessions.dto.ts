import { User } from '../../users/user.entity';
export class UpdateadminSessionsDto   {

  id_admin_session?: string;


  refresh_token: string;
  refresh_token_expired?: Date;

  ip: string;
  user_agent: string;



  updated_at?: Date;
  }