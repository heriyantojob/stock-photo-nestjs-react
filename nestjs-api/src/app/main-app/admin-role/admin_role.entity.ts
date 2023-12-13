import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import {
//   Min,
//   Max,
// } from "class-validator"
export const tableAdminRole = "admin_role"
@Entity(tableAdminRole)
export class AdminRole {
  @PrimaryGeneratedColumn()
  id_admin_role : number;
  //id_admin_role	name_admin_role	created_at	update_at	delete_at
  @Column({
 
  })
  name_admin_role : string;

 
  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  @Column({  nullable: true,default: null})
  deleted_at!: Date;



}

