import { Request, Response } from "express"
import User from "../../models/User";
const botId = process.env.BOT || '1';
export default async (req: Request, res: Response) => {
	try {
		const users = await User.query().whereNot({ id: botId });
		users.forEach(us => us.password = null);
		return res.status(200).send({ status: true, data: { users: users }, message: "Users loaded successful" })
	} catch (error: any) {
		console.log("Admin Users Error ======>", error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to load users, please try again in a few minutes",
			errors: [],
		});

	}
}