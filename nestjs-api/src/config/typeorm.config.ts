import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import "dotenv/config"

const DB_CONNECTION : string =  process.env.DB_CONNECTION

// console.log("process.env.DB_HOST ",process.env.DB_HOST)
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mysql",
    //type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    //port:5432,
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD ,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    //entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true,
    // logging: true
  };


  export enum DbErrorCode {
    UniqueViolation = 'ER_DUP_ENTRY',
    ForeignKeyViolation = '23503',
  }




// export const typeOrmConfig: TypeOrmModuleOptions = {
//     type:"mysql",
//     //type: 'postgres',
//     host: 'localhost',
//     port: 3306,
//     //port:5432,
//     username: 'root',
//     password: '',
//     database: 'project_joint_viral',
//     autoLoadEntities: true,
//     //entities: [__dirname + '/../**/*.entity.{ts,js}'],
//     synchronize: true,
//   };