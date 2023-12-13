import { Injectable ,BadRequestException} from '@nestjs/common';
import {CreateTemplateDto} from "./dto/create-template.dto"
import {Template,tableTemplate} from "./template.entity"
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { tableUser } from 'src/app/main-app/users/user.entity';
import { UpdateStatusTemplateDto } from './dto/update-status-template.dto';
import * as slug from "slug"
import {Like} from "typeorm";
import { UpdateTemplateInAdminDto } from 'src/app/admin-app/template-admin-app/dto/update-template-in-admin.dto';
interface PaginationReturn {
  total: number;
  results: Template[];
}
@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>,
        // private readonly userRepository: Repository<User>,
      ) {
        
      }
    
      async create(createTemplatedto: CreateTemplateDto): Promise<Template> {
        const template = new Template();
        template.status = createTemplatedto.status;
        template.user = createTemplatedto.id_user;
        // template.template_slug=createTemplatedto.template_slug;
        template.type_template=createTemplatedto.type_template;
        return  await this.templateRepository.save(template);
      }

      async updateStatus(id_template:number,updateStatusTemplateDto: UpdateStatusTemplateDto,reqUser,isEqualUser): Promise<Template> {
        let resultTemplate = await this.findOneEqualUser(id_template,reqUser.idUser)
        // console.log("result template",resultTemplate)
        if(!resultTemplate){
          throw new BadRequestException(["Stock not Found"]);
        }
        const template = new Template();
        
        // template.id_template = id_template;
        resultTemplate.title = updateStatusTemplateDto.title;
        resultTemplate.template_slug = slug(updateStatusTemplateDto.title)+"-"+id_template
       
        if(updateStatusTemplateDto.update_status==2){
          resultTemplate.status = updateStatusTemplateDto.update_status;
        }
        resultTemplate.description = updateStatusTemplateDto.description;
        resultTemplate.tags = updateStatusTemplateDto.tags;
    
        return  await this.templateRepository.save(resultTemplate);
      }
      
      async  findOne( id_template:number): Promise<Template>{
        return  await this.templateRepository.findOne({where :{ id_template }});
     
      }
      async  findOneEqualUser( id_template:number,id_user:string): Promise<Template>{

        return await this.templateRepository.findOne({
          select:{
            user: {
              id_user:true
            }
          },
          relations: ["user"],
          where: {
            id_template: id_template,
            user: {
              id_user
            },
          },
        });
        
     
      }
      async delete(id: number,reqUser,isEqualUser): Promise<void> {
        console.log("reqUser",reqUser)
        let resultTemplate = await this.findOneEqualUser(id,reqUser.idUser)
        console.log("resultTemplate",resultTemplate)
        
        if(!resultTemplate){
          throw new BadRequestException(["Stock not Found"]);
        }
          await this.templateRepository.softDelete(id);
        }

      async findTemplatePublic(): Promise<Template[]> {
        // return this.templateRepository.find();
        return this.templateRepository.find({ 
           relations: ['user'],
         
        });
      }
// template upload new

async getManyForPublic( pageQuery={offset:0, limit:5},addWhere) {

  let likeKeyword = Like(`%${addWhere.keyword}%`)
   const   resultDatacreateQuery= await this.templateRepository
          .createQueryBuilder(tableTemplate)
         //.where("status = 3")
    resultDatacreateQuery.where("status = 3")   
    if(addWhere.keyword){
      resultDatacreateQuery.andWhere(` (${tableTemplate}.tags->>'$[*]' LIKE :keyword or ${tableTemplate}.title like :keyword )`, {keyword:`%${addWhere.keyword}%`})
        
    }   

    if(addWhere.type) {
      resultDatacreateQuery.andWhere(`${tableTemplate}.type_template = :type_template  `,{type_template:addWhere.type})

    }       
    const  resultData = resultDatacreateQuery.skip(pageQuery.offset).take( pageQuery.limit).getManyAndCount()
 

  //  .where(` tags->>'$[*]' LIKE '%ganteng%'`, {keyword: addWhere.keyword}).getMany()
  

   return resultData

    
 }

 async getManyForAdmin( pageQuery={offset:0, limit:5},addWhere) {

  let likeKeyword = Like(`%${addWhere.keyword}%`)
   const   resultDatacreateQuery= await this.templateRepository
          .createQueryBuilder(tableTemplate)
          .leftJoin(tableTemplate+".user", "user")
          .select(tableTemplate+".id_template")
          .addSelect(tableTemplate+".title")
          .addSelect(tableTemplate+".tags")
     
          .addSelect(tableTemplate+".type_template")
          .addSelect(tableTemplate+".status")
           .addSelect(tableTemplate+".created_at")
          // .addSelect(tableTemplate+".title")
          .addSelect(tableUser+".id_user")
          .addSelect(tableUser+".email")
          //add where
          .where(`${tableTemplate}.status = :status`, { status: addWhere.status })
          if(addWhere.email_user){
            resultDatacreateQuery.andWhere(`${tableUser}.email = :email`, { email: addWhere.email_user })
          }
          if(addWhere.keyword){
            resultDatacreateQuery.andWhere(` (${tableTemplate}.tags->>'$[*]' LIKE :keyword or ${tableTemplate}.title like :keyword )`, {keyword:`%${addWhere.keyword}%`})
          }   
      
          if(addWhere.type_template) {
            resultDatacreateQuery.andWhere(`${tableTemplate}.type_template = :type_template  `,{type_template:addWhere.type_template})
          } 
        
          const  resultData = resultDatacreateQuery.skip(pageQuery.offset).take( pageQuery.limit).getManyAndCount()
  

          return resultData

    
 }
      
    
    async findAndCountCustom (  pageQuery={offset:0, limit:5},
                                      addSelect={},
                                      addWhere, 
                                      orderBy 
                                  ): Promise<PaginationReturn>  {
        // return this.templateRepository.find();
        const [results, total] =  await this.templateRepository.findAndCount({ 
          // select: {
          //   id_template: true,
          //   user: {
          //     id_user: true,
          //   },
          // },
            select:addSelect,
    
            relations: ['user'],
            where: addWhere,
        
            order:(orderBy)?orderBy: {created_at: "ASC" },
            skip: pageQuery.offset,
            take: pageQuery.limit,
          //  where: {
          //     user: {
          //         id_user: reqUser.idUser,
          //     },
          //   },
        });
        // console.log("total",total);
        return {results,total}
       
      }

      async findOneCustom (  
        addSelect={},
        addWhere
      ): Promise<Template>  {
// return this.templateRepository.find();
          const results=  await this.templateRepository.findOne({ 
   
          select:addSelect,

          relations: ['user'],
          where: addWhere,

          //  where: {
          //     user: {
          //         id_user: reqUser.idUser,
          //     },
          //   },
          });
          // console.log("total",total);
          return results

        }

        async updateAdmin(id_template:number,updateTemplateInAdminDto: UpdateTemplateInAdminDto ): Promise<Template> {
         
          let resultTemplate = await this.findOne(id_template)
   
           if(!resultTemplate){
             throw new BadRequestException(["Stock not Found"]);
           }
           const template = new Template();
           
          //  template.id_template = id_template;
          resultTemplate.title = updateTemplateInAdminDto.title;
          resultTemplate.template_slug = slug(updateTemplateInAdminDto.title)+"-"+id_template
          
          resultTemplate.status = updateTemplateInAdminDto.status;
          resultTemplate.description = updateTemplateInAdminDto.description;
          resultTemplate.tags = updateTemplateInAdminDto.tags;
          return  await this.templateRepository.save(resultTemplate);
       
        }
}


/*
SELECT * FROM `template` WHERE tags->>'$[*]' LIKE '%ganteng%';
query // SELECT * FROM `template` WHERE tags->>'$[*]' = ("pintar");
//SELECT *,tags->>'$[0]' as tagsOne FROM `template`

https://stackoverflow.com/questions/47814537/how-to-perform-a-like-query-typeorm
*/ 
