import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"

export const tableUser ="user";
@Entity(tableUser)
export class User {
  // @PrimaryGeneratedColumn()
  // id_user: number;

  @PrimaryGeneratedColumn("uuid")
  id_user: string;


  @Column({
    unique: true,
    nullable: true,
  })
  username !: string;

  @Column({
    unique: true,
    nullable: true,
  })
  photo_user !: string;

  @Column({
    unique: true
  })
  email !: string;

  @Column()
  password : string;

  @Column({  nullable: true,})
  name !: string;

  
  @Column({  nullable: true,})
  about !: string;

  @Column({  nullable: true,})
  phone !: string;

  @Column({  nullable: true,})
  user_verified !: number;

 
  // @Min(0)
  // @Max(3)
  //0 not active 1 active 2 block
  @Column({  nullable: true,width:1,type: 'tinyint'})
  status !: number;

  @Column({  nullable: true,type: 'tinyint',default:0,comment:"0 no ; 1 contributor"})
  contributor !: number;

  @Column({  nullable: true,type: 'tinyint',default:1,comment:"limit in 1 day"})
  contributor_limited !: number;


  @Column({  nullable: true,type: 'tinyint',default:0,comment:"0 no ; 1 unlimited"})
  contributor_unlimited !: number;


  // @Column({  nullable: true,})
  // token_email !: string;

  // @Column({  nullable: true,})
  // token_forgot !: string;



  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  @Column({  nullable: true,default: null})
  deleted_at!: Date;



}