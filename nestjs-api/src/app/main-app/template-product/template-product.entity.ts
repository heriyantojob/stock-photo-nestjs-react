import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"
@Entity("template_product")
export class TemplateProduct {
  
  @PrimaryGeneratedColumn()
  id_template_product   : number;

  @Column()
  name_template_product : number;

  @Column("simple-json")
  file_type : string;


  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  @Column({  nullable: true,default: null})
  deleted_at!: Date;


  
}

