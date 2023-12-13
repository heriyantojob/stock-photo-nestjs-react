
import {S3,Endpoint}  from 'aws-sdk';

// import { ConfigService } from '@nestjs/config';
import "dotenv/config"



const s3BucketName = process.env.AWS_BUCKET_NAME
const s3Region = process.env.AWS_BUCKET_REGION
const s3AccessKeyId = process.env.AWS_ACCESS_KEY
const s3SecretAccessKey = process.env.AWS_SECRET_KEY
const s3Endpoint = new Endpoint(process.env.AWS_ENDPOINT ); 
//const s3Endpoint = process.env.AWS_ENDPOINT ; 

export const s3Config = new S3({
    region: s3Region,
    accessKeyId: s3AccessKeyId,
    secretAccessKey: s3SecretAccessKey,
    endpoint: s3Endpoint,
});


