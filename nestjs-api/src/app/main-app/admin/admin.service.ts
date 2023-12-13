import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin ,tableAdmin} from './admin.entity';
import { tableAdminRole } from '../admin-role/admin_role.entity';
import UpdateAdminAdminAppDto from 'src/app/admin-app/admin-admin-app/dto/UpdateAdminAdminApp.dto';
import InsertAdminAdminAppDto from 'src/app/admin-app/admin-admin-app/dto/InsertAdminAdminApp.dto';
import * as bcrypt from 'bcrypt';
import { AdminRoleService } from '../admin-role/admin-role.service';
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private readonly adminRoleService: AdminRoleService,
   

      ) {}

    async findOneLogin(email: string): Promise<Admin> {
        // return await this.model.findById(id).exec();
        //  return await this.model.findOne({ username:id}).exec()
          let admin =  this.adminRepository.findOneBy({  email });

          if (admin) {
            return admin;
          }
          throw new BadRequestException(
            'Wrong credentials provided'
          );
       // return await this.model.findById({ _id: id }).exec();
     
       }


       async getManyByAdmin( pageQuery={offset:0, limit:5},addWhere) {

        const   resultDatacreateQuery= await this.adminRepository.createQueryBuilder(tableAdmin)
        


         const  resultData = resultDatacreateQuery
                              
                              // .select(['id_admin', 'username', 'email'])
                              .skip(pageQuery.offset).take( pageQuery.limit)
                              .select([
                                        `${tableAdmin}.id_admin`,`${tableAdmin}.username`,`${tableAdmin}.email`,
                                        `${tableAdmin}.name`,`${tableAdmin}.phone`,`${tableAdmin}.status`,
                                        `${tableAdmin}.created_at`,`${tableAdminRole}.id_admin_role`
                                      ])
                                      .leftJoin(`${tableAdmin}.adminRole`, `${tableAdminRole}`)
                                     
                              .getManyAndCount()
     
        return resultData
     
      }  

      async  getOne( id_admin:string): Promise<Admin>{

        // if(showPassword){
          
        // }

        const resultAdmin = await this.adminRepository.createQueryBuilder(tableAdmin)
            .select([
              `${tableAdmin}.id_admin`,`${tableAdmin}.username`,`${tableAdmin}.email`,
              `${tableAdmin}.name`,`${tableAdmin}.phone`,`${tableAdmin}.status`,
              `${tableAdmin}.created_at`,`${tableAdminRole}.id_admin_role`
            ])
            .leftJoin(`${tableAdmin}.adminRole`, `${tableAdminRole}`)
            .where(`${tableAdmin}.id_admin = :id_admin`, { id_admin: id_admin })
            .getOne();
        
        return resultAdmin
      }
      async  getCountSameEmail( email:string): Promise<number>{


        const countSameEmail = await this.adminRepository.createQueryBuilder(tableAdmin)
           
            .where(`${tableAdmin}.email = :email`, { email: email })
            .getCount();
        
        return countSameEmail
      }

      async  getCountSameUsername( username:string): Promise<number>{

        const countSameUsername = await this.adminRepository.createQueryBuilder(tableAdmin)
           
            .where(`${tableAdmin}.username = :username`, { username: username })
            .getCount();
        
        return countSameUsername
      }
      

      public async inserAdminByadmin(insertAdminAdminAppDto: InsertAdminAdminAppDto): Promise<Admin> {
        let messageError=[];
        // messageError.push("Admin Role not Found");

        //check admin role
        let resultAdminRole = await this.adminRoleService.getOne(insertAdminAdminAppDto.id_admin_role)
        if(!resultAdminRole)  messageError.push("Admin Role not Found") 

        //check Username already in use
        let countSameUsername = await this.getCountSameUsername(insertAdminAdminAppDto.username)
        if(countSameUsername) messageError.push("Username Already in Use")  
        
        //check Email already in use
        let countSameEmail = await this.getCountSameEmail(insertAdminAdminAppDto.email)
        if(countSameEmail)  messageError.push("Email Already in Use")  

        //show error
        if(messageError && messageError.length>0) throw new BadRequestException(messageError);
        
        
        const resultAdmin = new Admin();
        // user.id_user=id_user
        resultAdmin.status   = insertAdminAdminAppDto.status
        resultAdmin.email = insertAdminAdminAppDto.email
  
        resultAdmin.username = insertAdminAdminAppDto.username;
        resultAdmin.name = insertAdminAdminAppDto.name;
     
        resultAdmin.phone = insertAdminAdminAppDto.phone;

        resultAdmin.status=insertAdminAdminAppDto.status;
        // resultAdmin.adminRole.id_admin_role=insertAdminAdminAppDto.id_admin_role; 

        resultAdmin.adminRole=resultAdminRole; 
        resultAdmin.password= await bcrypt.hash(insertAdminAdminAppDto.password, 10);;  

        
        return this.adminRepository.save(resultAdmin);

      }

      public async updateAdminByadmin(updateAdminAdminAppDto: UpdateAdminAdminAppDto,id_admin): Promise<Admin> {
        let resultAdmin = await this.getOne(id_admin)
        if(!resultAdmin) throw new BadRequestException(["Admin Not Found"]);
        let messageError=[];
        //check admin role
        let resultAdminRole = await this.adminRoleService.getOne(updateAdminAdminAppDto.id_admin_role)
        if(!resultAdminRole)  messageError.push("Admin Role not Found") 

        
        //check Username already in use
        if(updateAdminAdminAppDto.username != resultAdmin.username){
          let countSameUsername = await this.getCountSameUsername(updateAdminAdminAppDto.username)
          if(countSameUsername) messageError.push("Username Already in Use")  
        }
           //check Email already in use
        if(updateAdminAdminAppDto.email != resultAdmin.email){
          let countSameEmail = await this.getCountSameEmail(updateAdminAdminAppDto.email)
          if(countSameEmail)  messageError.push("Email Already in Use")  
        }
        
          //show error
              //show error
        if(messageError && messageError.length>0) throw new BadRequestException(messageError);

          //insert data
        resultAdmin.status   = updateAdminAdminAppDto.status
        resultAdmin.email = updateAdminAdminAppDto.email
  
        resultAdmin.username = updateAdminAdminAppDto.username;
        resultAdmin.name = updateAdminAdminAppDto.name;
     
        resultAdmin.phone = updateAdminAdminAppDto.phone;

        resultAdmin.status=updateAdminAdminAppDto.status;
        resultAdmin.adminRole=resultAdminRole;
        
        if(  updateAdminAdminAppDto.password)  resultAdmin.password= await bcrypt.hash(updateAdminAdminAppDto.password, 10)
        
        return this.adminRepository.save(resultAdmin);

      }
        
}
