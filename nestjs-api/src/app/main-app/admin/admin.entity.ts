import { truncate } from 'fs';
import { Column,CreateDateColumn, Entity, PrimaryGeneratedColumn ,DeleteDateColumn,
  ManyToOne,JoinColumn} from 'typeorm';
import { AdminRole } from '../admin-role/admin_role.entity';
// import {
//   Min,
//   Max,
// } from "class-validator"
export const tableAdmin = "admin"
@Entity(tableAdmin)
export class Admin {
//  id_admin	username	email	password	name	phone	verified	id_admin_role	status	created_at	update_at	delete_at
  // @PrimaryGeneratedColumn()
  // id_admin : number;

  @PrimaryGeneratedColumn("uuid")
  id_admin : string;

  @Column({
    unique: true,
    nullable: true,
  })
  username !: string;

  
  @Column({  nullable: true,})
  name !: string;

  @ManyToOne(() => AdminRole, (adminRole) => adminRole.id_admin_role)
  @JoinColumn( {  name: "id_admin_role",referencedColumnName:"id_admin_role"})
  adminRole: AdminRole;



  @Column({
    unique: true
  })
  email !: string;

  @Column({  nullable: true,})
  phone !: string;

  @Column()
  password : string;

 
  @Column({comment:"0 non active; 1 active; 2 blocked"})
  status !: number;
  
  @CreateDateColumn({  })
  created_at: Date;
  
  @Column({  nullable: true,default: null})
  updated_at!: Date;

  @Column({  nullable: true,default: null})
  deleted_at!: Date;



}

