import { Column,CreateDateColumn, Entity,
   PrimaryGeneratedColumn,PrimaryColumn ,DeleteDateColumn,
   ManyToOne,JoinColumn,ManyToMany,JoinTable
} from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"
import { v4 as uuidv4 } from 'uuid';
import { Admin } from '../admin/admin.entity';
export const tableAdminSessions = "admin_sessions"
// @Entity("user_sessions")
@Entity(tableAdminSessions)
export class AdminSession {

  @PrimaryGeneratedColumn("uuid")
  id_admin_session: string;

  
  @ManyToOne(() => Admin, (admin) => admin.id_admin)
  @JoinColumn( {  name: "id_admin",referencedColumnName:"id_admin"})
  admin: Admin;

  @Column({
    
    nullable: true,
  })
  refresh_token :string

  @Column({
    
    nullable: true,
  })
  refresh_token_expired !: Date;

  @Column()
  ip !: string;

  @Column()
  user_agent !: string;



  @CreateDateColumn({  })
  created_at: Date;
  
  // @Column({  nullable: true,default: null})
  // updated_at!: Date;

  @CreateDateColumn({  })
  updated_at: Date;

  @DeleteDateColumn({  nullable: true,default: null})
  deleted_at!: Date;

}