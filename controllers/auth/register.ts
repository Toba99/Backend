import { Request, Response } from "express"
import User from "../../models/User";
import registerValidation from "../../validations/auth/registerValidation"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import { transaction } from "objection"
const saltRounds = process.env.SALT_ROUNDS || '10';

export default async (req: Request, res: Response) => {
	try {
		
		const { errors, value } = await registerValidation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		let { firstName, lastName, email, password } = value 

		const userEmail = await User.query()
			.findOne({ email });

		if (userEmail) {
			return res.status(406).send({
				status: false,
				data: {},
				message:
					"You already have an account with this email, please login",
			});
		}

		let passwordHash: any = null;
		if (password) {
			passwordHash = await bcrypt.hash(password, parseInt(saltRounds));
		}
		let newUser: any = null;
		try {
			await transaction(
				User,
				async (User: any) => {
					const newUserData = {
						firstName,
						lastName,
						email,
						password: passwordHash,
						email_verified_at: null,
						notification: 1,
						created_at: new Date(),
						updated_at: new Date(),
					};

					newUser = await User.query().insertAndFetch(newUserData);

				}
			);
		} catch (error: any) {
			console.log("Registration Error =======>", error.message, error.stack);
			return res.status(406).send({
				status: false,
				data: {},
				message: "Registration error, kindly try again in a few minutes",
			});
		}
		if (!newUser) {
			return res.status(401).send({
				status: false,
				data: {},
				message: "Registration error, kindly try again in a few minutes",
			});
		}

		const privateKey = fs.readFileSync(path.join(__dirname, "../../julia.key"));

		const token = jwt.sign(
			{ id: newUser.id, created_at: new Date() },
			privateKey,
			{
				algorithm: "RS256",
				expiresIn: "31d",
			}
		);

		const theUser = await User.query()
			.findById(newUser.id)
		if (theUser) {
			return res.status(201).send({
				status: true,
				data:{token, user: theUser.user()},
				message:"Registration successful "
			});
		}
		return res.status(200).send({status: true,data:{}, message:"Registration successful "})
	} catch (error: any) {
		console.log("Register Error ======>", error);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to register, please try again in a few minutes",
			errors: [],
		});

	}
}