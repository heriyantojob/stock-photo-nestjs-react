import { Column,CreateDateColumn, Entity,
   PrimaryGeneratedColumn,PrimaryColumn ,DeleteDateColumn,
   ManyToOne,JoinColumn,ManyToMany,JoinTable
} from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.entity';
export const tableUserSessions = "user_sessions"
// @Entity("user_sessions")
@Entity(tableUserSessions)
export class UserSessions {

  @PrimaryGeneratedColumn("uuid")
  id_user_session: string;

  
  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn( {  name: "id_user",referencedColumnName:"id_user"})
  user: User;

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

  // @ManyToOne(type => User)
  // @JoinColumn([
  //     { name: "category_id", referencedColumnName: "id" },
  //     { name: "locale_id", referencedColumnName: "locale_id" }
  // ])
  // user: User;

  // @ManyToOne(() => User, (user) => user.id_user)
  // @JoinTable()
  // user: User
 
 



}