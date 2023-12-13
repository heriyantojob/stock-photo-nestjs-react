import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionUtils {
  constructor(private configService: ConfigService) {}

  async encrypt(data: string): Promise<string> {
    const algorithm = 'aes-256-cbc';
    const key = await this.getKey();
    const iv = Buffer.from(this.configService.get<string>('ENCRYPTION_IV'), 'hex');
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  async decrypt(data: string): Promise<string> {
    const algorithm = 'aes-256-cbc';
    const key = await this.getKey();
    const iv = Buffer.from(this.configService.get<string>('ENCRYPTION_IV'), 'hex');
    const decipher = createCipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  private async getKey(): Promise<Buffer> {
    const password = this.configService.get<string>('ENCRYPTION_KEY');
    const salt = randomBytes(32);
    const key = await new Promise<Buffer>((resolve, reject) => {
      scrypt(password, salt, 32, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey);
      });
    });
    return key;
  }
}