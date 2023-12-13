
import { createCipheriv, randomBytes, scrypt,createDecipheriv  } from 'crypto';
import { promisify } from 'util';
import { 
    Controller , Post,Body, Get
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('encryption')
export class EncryptionController {
    constructor(private configService: ConfigService) {}

    @Get("/key")
    randomKey(){
        const encryptionKey = randomBytes(32).toString('hex');
        console.log(encryptionKey); // prints a 64-character hexadecimal string
        return encryptionKey

    }
     @Post('encrypt')
    encrypt(@Body() data: { message: string }): { encryptedData: string, iv: string } {
        const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
        const algorithm = "aes-256-cbc";
        const initVector = randomBytes(16);
        console.log(process.env.ENCRYPTION_KEY)
        const Securitykey = Buffer.from(encryptionKey, 'hex');
        //console.log(Securitykey)
        //const Securitykey = process.env.ENCRYPTION_KEY;
        const cipher = createCipheriv(algorithm, Securitykey, initVector);
        let encryptedData = cipher.update(data.message, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return { encryptedData, iv: initVector.toString('hex') };

     
    }

    @Post('decrypt')
    decrypt(@Body() data: { encryptedData: string, iv: string }) {
        // return data.iv
        const algorithm = "aes-256-cbc";
        const initVector = Buffer.from(data.iv, 'hex');
        const Securitykey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // use the same secret key used for encryption
        const decipher = createDecipheriv(algorithm, Securitykey, initVector);
        let decryptedData = decipher.update(data.encryptedData, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        return { decryptedData };
    }
  
    @Post('encrypt-sample')
    async encryptSample() {
      

        
        const algorithm = "aes-256-cbc"; 

        // generate 16 bytes of random data
        const initVector = randomBytes(16);

        // protected data
        const message = "This is a secret message";

        // secret key generate 32 bytes of random data
        const Securitykey = randomBytes(32);

        // the cipher function
        const cipher = createCipheriv(algorithm, Securitykey, initVector);

        // encrypt the message
        // input encoding
        // output encoding
        let encryptedData = cipher.update(message, "utf-8", "hex");

        encryptedData += cipher.final("hex");

        console.log("Encrypted message: " + encryptedData);

        // the decipher function
        const decipher = createDecipheriv(algorithm, Securitykey, initVector);

        let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

        decryptedData += decipher.final("utf8");

        console.log("Decrypted message: " + decryptedData);
        return {encryptedData,decryptedData,initVector}

    }

    // @Get('decrypt')
    // async decrypt(): Promise<string> {
    //   const iv = randomBytes(16);
    //   const key = await promisify(scrypt)(this.password, 'salt', 32);
    //   const decipher = createDecipheriv('aes-256-ctr', key, iv);
  
    //   const encryptedText = Buffer.from('base64-encoded-encrypted-text', 'base64');
    //   const decryptedText = Buffer.concat([
    //     decipher.update(encryptedText),
    //     decipher.final(),
    //   ]);
  
    //   return decryptedText.toString();
    // }
   
}
