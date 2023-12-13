import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"
@Entity("template_product_lang")
export class TemplateProductLang {
  
  @PrimaryGeneratedColumn()
  id_template_product_lang    : number;

  @Column()
  name_template_type_lang : string;

  @Column()
  description_template_type_lang : string;

  @Column()
  language_code: string;

  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  @Column({  nullable: true,default: null})
  deleted_at!: Date;


}

