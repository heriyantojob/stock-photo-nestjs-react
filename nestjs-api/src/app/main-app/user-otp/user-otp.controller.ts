import { Controller ,Get} from '@nestjs/common';
import  * as nodemailer from "nodemailer";
import { UserOtpService } from './user-otp.service';

@Controller('user-otp')
export class UserOtpController {
    constructor(
        private readonly userOtpService: UserOtpService,

    ) {}
   

    @Get("/nodemailer-email")
    async nodemailerTestSend() {
        // let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
           
            auth: {
                user: "fabeb987a1a47e", // generated ethereal user
                pass: "5f8a5f43cddd3f", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"No Reply 👻" <test@example.com>', // sender address
            to: "heriyantoajja@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return {success:"success"};
        // return req.user;
        //return req.headers['authorization']
    }
}
