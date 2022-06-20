require("dotenv").config();
import nodemailer from "nodemailer";
const EMAIL_USER = process.env.EMAIL_USER || '1234';
const EMAIL_PASS = process.env.EMAIL_PASS || '1234';
const EMAIL_FROM = process.env.EMAIL_FROM;
type email = {
	to: string
	subject: string
	message: string
}
export default async ({to, subject, message}: email) => {
	try {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: true, // true for 465, false for other ports
			auth: {
				user: EMAIL_USER, // generated ethereal user
				pass: EMAIL_PASS, // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: EMAIL_FROM, // sender address
			to, // list of receivers
			subject, // Subject line
			html: message, // html body
		});

		console.log("Message sent: %s", info.messageId);

		return true

	} catch (error) {

	}
}