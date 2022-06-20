import { Request, Response } from "express"
import loginValidation from "../../validations/auth/loginValidation"
import User from "../../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import dateTime from "../../utils/dateTime"

export default async (req: Request, res: Response) => {
	try {
		const { errors, value } = await loginValidation(req.body);
		
		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		const { email, password } = value
		const user = await User.query().findOne({ email })
			.whereNull("deleted_at");

		if (!user) {
			return res.status(400).send({
				status: false,
				date: {},
				message: `Wrong email and password combination`,
			});
		}

		const validated = await bcrypt.compare(password, user.password);

		if (!validated) {
			return res.status(400).send({
				status: false,
				data: {},
				message: `Wrong email and password combination`,
			});
		}

		const privateKey = fs.readFileSync(path.join(__dirname, "../../julia.key"));
		let token = "";
		const createdAt = dateTime();
		const payload = {
			id: user.id,
			created_at: createdAt,
		};
		token = jwt.sign(payload, privateKey, {
			algorithm: "RS256",
			expiresIn: "31d",
		});


		return res.status(200).send({
			status: true,
			data:{token, user: user.user()},
			message: "Login successful",
		});
	} catch (error: any) {
		console.log("Login Error ======>", error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to login, please try again in a few minutes",
			errors: [],
		});

	}
}