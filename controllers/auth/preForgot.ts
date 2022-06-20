import { Request, Response } from "express"
import preForgotValidation from '../../validations/auth/preForgotValidation';
import User from "../../models/User";
import PasswordReset from '../../models/PasswordReset';
import generateOTP from "../../utils/generateOTP";

export default async (req: Request, res: Response) => {
	try {
		const { errors, value } = await preForgotValidation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		const { email } = value
		const user = await User.query().findOne({ email });
		if (!user) {
			return res.status(200).send({
				status: true,
				data: {},
				message: `A reset token have been sent to ${email}`,
			});
		}

		const otp = generateOTP();

		await PasswordReset.query().insert({
			email,
			token: otp,
			create_at: new Date(),
			update_at: new Date()
		});

		// Send reset email token to provided email

		return res.status(200).send({
			status: true,
			data: {},
			message: `A reset token have been sent to ${email}`,
		});

	} catch (error: any) {
		console.log("PreForget Error ======>", error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to send reset password email, please try again in a few minutes",
			errors: [],
		});

	}
}