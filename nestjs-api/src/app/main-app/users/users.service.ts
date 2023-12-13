import { HttpException, HttpStatus,Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User,tableUser } from './user.entity';
// import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { DbErrorCode } from '../../../config/typeorm.config';
import isRecord  from '../../../utils/base/isRecord';
import UpdateUserAdminAppDto from 'src/app/admin-app/user-admin-app/dto/UpdateUserAdminApp.dto';
import * as bcrypt from 'bcrypt';
import { logDebug } from 'src/utils/base/logDebug';
import UpdateUserProfileDto from './dto/update-user-profile.dto';
import UpdateUserProfilePasswordDto from './dto/update-user-profile-password.dto';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}
    
 
      async  findOne( 
        id_user:string,
        selectFields=null): Promise<User>{
        if(selectFields===null){
          selectFields = {
            id_user: true,
            username: true,
            email: true,
            name: true,
            phone: true,
            user_verified: true,
            status: true,
            contributor: true,
            contributor_unlimited: true,
            about:true,
            created_at: true,
            updated_at: true,
            deleted_at: true
          }
        }
        
        let resultData = await this.usersRepository.findOne({
          where: { id_user },
          select: selectFields
        });
        //let resultData  = await this.usersRepository.findOne(id_user, { select });
     
        return resultData
     
      }


      async findOneLogin(email: string): Promise<User> {
        // return await this.model.findById(id).exec();
        //  return await this.model.findOne({ username:id}).exec()
          let user = await this.usersRepository.findOneBy({  email });

          if (user) {
            return user;
          }
          // throw new HttpException(
          //   'User with this email does not exist',
          //   HttpStatus.NOT_FOUND,
          // );
          throw new BadRequestException(
            ['Username or Password not found']
            
          );
       // return await this.model.findById({ _id: id }).exec();
     
       }

       
       
       async create(createUserDto: CreateUserDto) {
        

        try {
          const user = new User();
          user.username   = createUserDto.username
          user.name   = createUserDto.name
          user.password   = createUserDto.password
          user.email   = createUserDto.email
          user.status   = 0
          let resultADD = await this.usersRepository.save(user);
          return resultADD    
        } catch (error) {
    
          if (isRecord(error) && error['code'] === DbErrorCode.UniqueViolation) {
            throw new BadRequestException(
              ['Email already exists']
              
            );
            // throw new BadRequestException();
            // return
          }else{
            throw new HttpException(
              [' went wrong'],
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }

        }
           
      }

      public async updateUserByadmin(updateUserAdminAppDto: UpdateUserAdminAppDto,id_user): Promise<User> {
        let messageError=[];
        let resultUser = await this.findOne(id_user)
        if(!resultUser) throw new BadRequestException(["User Not Found"]);
        // const user = new User();
        // user.id_user=id_user

        if(updateUserAdminAppDto.email != resultUser.email){
          let countSameEmail = await this.getCountSameEmail(updateUserAdminAppDto.email)
          if(countSameEmail)  messageError.push("Email Already in Use")  
        }
        if(messageError && messageError.length>0) throw new BadRequestException(messageError);

        resultUser.status   = updateUserAdminAppDto.status
        resultUser.email = updateUserAdminAppDto.email
  
        resultUser.username = updateUserAdminAppDto.username;
        resultUser.name = updateUserAdminAppDto.name;
     
        resultUser.phone = updateUserAdminAppDto.phone;

        resultUser.status=updateUserAdminAppDto.status;
        resultUser.user_verified = updateUserAdminAppDto.id_user_verified;
        resultUser.contributor = updateUserAdminAppDto.contributor;
   
        resultUser.contributor_unlimited= updateUserAdminAppDto.contributor_unlimited;
   
        return this.usersRepository.save(resultUser);

      }

      public async updateProfileByUser(updateUserProfileDto: UpdateUserProfileDto,id_user): Promise<User> {
        let  selectFields =  {
          id_user: false,
          username: true,
          email: true,
          name: true,
          about:true,
          phone: true,
          password:true,
         
        }
       
        let messageError=[];
        let resultUser = await this.findOne(id_user,selectFields)

        await this.verifyPassword(updateUserProfileDto.password,resultUser.password)
        if(!resultUser) throw new BadRequestException(["User Not Found"]);

        // this.verifyPassword(updateUserProfileDto.password, resultUser.password)

        if(updateUserProfileDto.email != resultUser.email){
          let countSameEmail = await this.getCountSameEmail(updateUserProfileDto.email)
          if(countSameEmail)  messageError.push("Email Already in Use")  
        }

        if(updateUserProfileDto?.username != resultUser?.username){
          let countSameEmail = await this.getCountSameEmail(updateUserProfileDto.email)
          if(countSameEmail)  messageError.push("Username Already in Use")  
        }

        if(messageError && messageError.length>0)  throw new BadRequestException(messageError);
        resultUser.id_user =id_user
        resultUser.email = updateUserProfileDto.email  
        resultUser.username = updateUserProfileDto.username;
        resultUser.name = updateUserProfileDto.name;
        resultUser.about = updateUserProfileDto.about;
   
         let resultUpdate = await this.usersRepository.save(resultUser);
         delete  resultUpdate.password;
         return resultUpdate

      }

      public async updateProfilePasswordByUser(updateUserProfilePasswordDto: UpdateUserProfilePasswordDto,id_user): Promise<User> {
        let  selectFields =  {
          id_user: false,
          password:true,
         
        }
       
        let messageError=[];
        let resultUser = await this.findOne(id_user,selectFields)

        await this.verifyPassword(updateUserProfilePasswordDto.password,resultUser.password)
      
        if(!resultUser) throw new BadRequestException(["User Not Found"]);


        if(messageError && messageError.length>0) throw new BadRequestException(messageError);
        resultUser.id_user =id_user
        const hashedPassword = await bcrypt.hash(updateUserProfilePasswordDto.newPassword, 10);
        resultUser.password = hashedPassword
      
   
         let resultUpdate = await this.usersRepository.save(resultUser);
         delete  resultUpdate.password;
         return resultUpdate

      }


      public async updateUserActive(id_user): Promise<User> {
        //let resultTemplate = await this.findOne(id_user)
        const user = new User();
        user.id_user=id_user
        user.status   = 1
        return this.usersRepository.save(user);
      }

      async  getCountSameEmail( email:string): Promise<number>{


        const countSameEmail = await this.usersRepository.createQueryBuilder(tableUser)
           
            .where(`${tableUser}.email = :email`, { email: email })
            .getCount();
        
        return countSameEmail
      }

    


      async  getCountSameUsername( username:string): Promise<number>{

        const countSameUsername = await this.usersRepository.createQueryBuilder(tableUser)
           
            .where(`${tableUser}.username = :username`, { username: username })
            .getCount();
        
        return countSameUsername
      }
      //get for Admin
      async getManByAdmin( pageQuery={offset:0, limit:5},addWhere) {

         const   resultDatacreateQuery= await this.usersRepository
                .createQueryBuilder(tableUser)
       
                if(addWhere.email){
                  resultDatacreateQuery.andWhere(`${tableUser}.email = :email`, { email: addWhere.email })
                }

                if(addWhere.status){
                  resultDatacreateQuery.andWhere(`${tableUser}.status = :status`, { status: addWhere.status })
                }

                if(addWhere.contributor){
                  resultDatacreateQuery.andWhere(`${tableUser}.contributor = :contributor`, { contributor: addWhere.contributor })
                }
                if(addWhere.contributor_unlimited){
                  resultDatacreateQuery.andWhere(`${tableUser}.contributor_unlimited = :contributor_unlimited`, { contributor_unlimited: addWhere.contributor_unlimited })
                }
        
          const  resultData = resultDatacreateQuery.skip(pageQuery.offset).take( pageQuery.limit).getManyAndCount()
       
    
      
         return resultData
      
      }   
      public  async verifyPassword(
        plainTextPassword: string,
        hashedPassword: string,
       errorMessage:string[]= ["Wrong Last Password"]
      ) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword,
        );
        if (!isPasswordMatching) {
          // throw new HttpException(
          //   errorMessage,
          //   HttpStatus.BAD_REQUEST,
          // );
            throw new BadRequestException(
              errorMessage
              
            );
        }
      }

    
}

/*


===========rechapcha
https://stackoverflow.com/questions/71696372/how-to-add-a-google-recaptcha-v3-to-a-functional-react-component-with-a-form
https://www.techomoro.com/how-to-add-google-recaptcha-v3-in-a-next-js-form/
*/ 