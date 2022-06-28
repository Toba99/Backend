import { Request, Response } from "express"
import userChatValidation from "../../validations/admin/userChatValidation";
import Chart from "../../models/Chat";

export default async (req: Request, res: Response) => {
	try {
		const { errors, value } = await userChatValidation(req.params);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		let { id } = value

		const userChat = await Chart.query().where({ user_id: id }).orWhere({ peer_user_id: id })
		return res.status(200).send({ status: true, data: { chat: userChat }, message: "Chat loaded successful" })

	} catch (error: any) {
		console.log("Adim chat Error ======>", error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to logout, please try again in a few minutes",
			errors: [],
		});

	}
}