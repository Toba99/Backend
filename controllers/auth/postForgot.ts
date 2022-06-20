import { Request, Response } from "express"
import postForgotValidation from '../../validations/auth/postForgotValidation';
import User from "../../models/User";
import PasswordReset from '../../models/PasswordReset';
import bcrypt from "bcryptjs"

const saltRounds = process.env.SALT_ROUNDS || '10';

export default async (req: Request, res: Response) => {
	try {
		const { errors, value } = await postForgotValidation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		const { token, password } = value

		const checkToken = await PasswordReset.query().findOne({ token });
		if (!checkToken) {
			return res.status(200).send({
				status: false,
				data: {},
				message: "Password updated successfully ",
			});
		}

		const user = await User.query().findOne({ email: checkToken.email });

		if (!user) {
			return res.status(200).send({
				status: false,
				data: {},
				message: "Password updated successfully ",
			});
		}

		let passwordHash: any = null;
		if (password) {
			passwordHash = await bcrypt.hash(password, parseInt(saltRounds));
		}
		await User.query().findOne({ email: checkToken.email }).update({
			password: passwordHash,
			updated_at: new Date()
		})
		await PasswordReset.query().deleteById(checkToken.id);
		return res.status(200).send({
			status: false,
			data: {},
			message: "Password updated successfully ",
		});
	} catch (error: any) {
		console.log("PostForgot Error ======>", error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to reset password, please try again in a few minutes",
			errors: [],
		});

	}
}