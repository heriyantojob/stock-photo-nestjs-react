import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn ,DeleteDateColumn,
    ManyToOne,JoinColumn  } from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"
import { User } from '../users/user.entity';
@Entity("user_otp")
export class UserOtp {
    @PrimaryGeneratedColumn("uuid")
  id_user_otp: string;


  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn( {  name: "id_user",referencedColumnName:"id_user"})
  user: User;

  
  @Column({
    unique: true
  })
  email !: string;

  
  @Column({
    unique: true,
    nullable: true,
  })
  phone !: string;


  @Column({comment: 'forgot_password | register | change_email'})
  type_otp : string;

  @Column()
  token !: string;

  @Column(   {nullable: true} )
  otp !: string;

  @Column({default: 0} )
  status !: number;
  @Column({  nullable: true,default: null})
  expired_at!: Date;

  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  @Column({  nullable: true,default: null})
  deleted_at!: Date;

  @Column()
  ip !: string;

  @Column()
  user_agent !: string;




}