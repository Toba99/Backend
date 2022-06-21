import { Request, Response } from "express"
import Chat from "../../models/Chat";
import chatValidation from "../../validations/chat/chatValidation"
import { Wit, log } from "node-wit"
import { allIntents, causes, drugs, recommendations, responses, symptoms } from "../../helpers/responsefile"
const botId = process.env.BOT || '1';
const client = new Wit({
	accessToken: process.env.WIT_TOKEN || '',
	logger: new log.Logger(log.DEBUG), // optional
});

export default async (req: Request, res: Response) => {
	try {
		const user = req.user
		const { errors, value } = await chatValidation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		let { message } = value

		await Chat.query()
			.insert({
				user_id: user.id,
				peer_user_id: botId,
				message,
				status: 'send',
				created_at: new Date,
				updated_at: new Date
			});

		const witRes = await client.message(message, {})
		let intents = <any>[]
		let action = ''
		if (witRes.intents) {
			intents = witRes.intents
		}
		if (intents.length > 0) {
			action = intents[0].name
		}
		
		switch (action) {
			case "greeting":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.greetings[Math.floor(Math.random() * responses.greetings.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				break;
			case "get_malaria":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_malaria[Math.floor(Math.random() * responses.get_malaria.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_malaria[Math.floor(Math.random() * symptoms.get_malaria.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_malaria[Math.floor(Math.random() * causes.get_malaria.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_malaria[Math.floor(Math.random() * recommendations.get_malaria.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_malaria[Math.floor(Math.random() * drugs.get_malaria.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

			default:
				break;
		}

		return res.status(200).send({ status: true, data: {}, message: "Message sent " })
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