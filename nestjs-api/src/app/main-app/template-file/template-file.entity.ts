import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn ,DeleteDateColumn,
  ManyToOne,JoinColumn,JoinTable} from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"

import { Template } from '../template/template.entity';
@Entity("template_file")
export class TemplateFile {
  
  // @PrimaryGeneratedColumn("uuid")
  // id_template_file  : string;

  @PrimaryGeneratedColumn()
  id_template_file  : number;

  // @Column()
  // id_template : string;

  @ManyToOne(() => Template, (template) => template.id_template)
  @JoinColumn( {  name: "id_template",referencedColumnName:"id_template"})
  template: Template;


  // @ManyToOne(type => Template)
  // @JoinTable()
  // templateTes: Template;

  @Column({nullable: true,})
  file_name : string;

  @Column({unique:true, nullable: true})
  file_slug : string;

  @Column({nullable: true})
  file_ext : string;

  @Column({nullable: true})
  file_mime : string;
  
  @Column("simple-json",{nullable: true})
  file_list :{} ;

  @Column({nullable: true})
  file_size :number ;

  @Column({nullable: true})
  file_width ?:number ;

  @Column({nullable: true})
  file_height	 ?:number ;



//0 tidak , 1 iya
  @Column({nullable: true,comment:"0 no; 1 yes"})
  in_download	 :number ;

  @Column({nullable: true,comment:"0 no; 1 yes"})
  in_preview	 :number ;

  // @Column()
  // sort	 :number ;

  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  @DeleteDateColumn({  nullable: true,default: null})
  deleted_at!: Date;

  
  
//   {
//     "large": {
//         "file_name": "large-banner-blog.png",
//         "file_size": 707769,
//         "file_width": 1920,
//         "file_height": 1080
//     },
//     "small": {
//         "file_name": "small-banner-blog.png",
//         "file_size": 138184,
//         "file_width": 640,
//         "file_height": 360
//     },
//     "medium": {
//         "file_name": "medium-banner-blog.png",
//         "file_size": 378998,
//         "file_width": 1280,
//         "file_height": 720
//     },
//     "thumbnail": {
//         "file_name": "thumbnail-banner-blog.png",
//         "file_size": 51090,
//         "file_width": 320,
//         "file_height": 180
//     }
// }
  
  

  



}

