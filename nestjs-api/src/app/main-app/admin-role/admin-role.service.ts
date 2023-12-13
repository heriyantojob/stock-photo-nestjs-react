import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminRole,tableAdminRole } from './admin_role.entity';

@Injectable()
export class AdminRoleService {
    constructor(
        @InjectRepository(AdminRole)
        private readonly adminRepository: Repository<AdminRole>,
       
      ) {}

    async  getOne( id_admin_role:number,isOnlyId=false): Promise<AdminRole>{

        // if(showPassword){
          
        // }

        const resultAdmin = await this.adminRepository.createQueryBuilder(tableAdminRole)
        
           
            .where(`${tableAdminRole}.id_admin_role = :id_admin_role`, { id_admin_role: id_admin_role })
            .getOne();
            console.log(resultAdmin)
        return resultAdmin
      }
}
