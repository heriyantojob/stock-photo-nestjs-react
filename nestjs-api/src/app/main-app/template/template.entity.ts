import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn,DeleteDateColumn,
  ManyToOne,JoinColumn } from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"
import { User } from '../users/user.entity';
export const tableTemplate ="template";
@Entity(tableTemplate)
export class Template {
  @PrimaryGeneratedColumn()
  id_template : number;

  @Column({
    nullable: true,
  })
  title !: string;

  @Column({  nullable: true,})
  description !: string;

  @Column({  nullable: true,width:1,type: 'tinyint'})
  status : number;

  @Column({  nullable: true,width:1,type: 'tinyint'})
  update_status : number;
  @Column({

    nullable: true,
  })
  live_demo_url !: string;

  @Column('json',{  nullable: true})
  tags !:string[];


  // @Column({
  //   nullable: true,
  // })
  // id_template_product !: number;

  @Column({
    nullable: true,
  })
  type_template !: string;




  @Column({
    nullable: true,
  })
  format_file !: number;

  // @Column()
  // id_user : number;

  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn( {  name: "id_user",referencedColumnName:"id_user"})
  user: User;


  @Column({
    unique: true,
    nullable: true,
  })
  template_slug !: string;
  // slug_template !: string;
 
  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  // @Column({  nullable: true,default: null})
  // deleted_at!: Date;
  @DeleteDateColumn({  nullable: true,default: null})
  deleted_at!: Date;

}

