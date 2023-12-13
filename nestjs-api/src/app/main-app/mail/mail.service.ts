import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { User } from './../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailTemplate() {
    const url = `google.com`;

    await this.mailerService.sendMail({
      to: "heriyantoajja@gmail.com",
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './tempalate', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: "heriyanto",
        url,
      },
    });
  }
}