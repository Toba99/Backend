import { Request, Response } from "express"

import Chat from "../../models/Chat";

export default async (req: Request, res: Response) => {
	try {

		const user = req.user
		const loadedChat = await Chat.query().where({user_id: user.id}).orWhere({peer_user_id: user.id})
		return res.status(200).send({ status: true, data: {chat: loadedChat}, message: "chat loaded successful " })
	} catch (error: any) {
		console.log("load chat Error ======>", error);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to load chat, please try again in a few minutes",
			errors: [],
		});

	}
}