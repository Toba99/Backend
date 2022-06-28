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
		console.log(witRes);
		
		let intents = <any>[]
		let action = ''
		if (witRes.intents) {
			intents = witRes.intents
		}
		if (intents.length > 0) {
			action = intents[0].name
		}
		
		switch (action) {
			case "greetings":
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

			case "jokes":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.jokes[Math.floor(Math.random() * responses.jokes.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				break;
			case "get_pregnant":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_pregnant[Math.floor(Math.random() * responses.get_pregnant.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				break;
			case "get_cancer":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_cancer[Math.floor(Math.random() * responses.get_cancer.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				break;
			case "hunger":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.hunger[Math.floor(Math.random() * responses.hunger.length)],
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

				case "get_typhoid":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_typhoid[Math.floor(Math.random() * responses.get_typhoid.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_typhoid[Math.floor(Math.random() * symptoms.get_typhoid.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_typhoid[Math.floor(Math.random() * causes.get_typhoid.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_typhoid[Math.floor(Math.random() * recommendations.get_typhoid.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_typhoid[Math.floor(Math.random() * drugs.get_typhoid.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_hayfever":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_hayfever[Math.floor(Math.random() * responses.get_hayfever.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_hayfever[Math.floor(Math.random() * symptoms.get_hayfever.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_hayfever[Math.floor(Math.random() * causes.get_hayfever.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_hayfever[Math.floor(Math.random() * recommendations.get_hayfever.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_hayfever[Math.floor(Math.random() * drugs.get_hayfever.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_sinusitis":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_sinusitis[Math.floor(Math.random() * responses.get_sinusitis.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_sinusitis[Math.floor(Math.random() * symptoms.get_sinusitis.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_sinusitis[Math.floor(Math.random() * causes.get_sinusitis.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_sinusitis[Math.floor(Math.random() * recommendations.get_sinusitis.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_sinusitis[Math.floor(Math.random() * drugs.get_sinusitis.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_commoncold":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_commoncold[Math.floor(Math.random() * responses.get_commoncold.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_commoncold[Math.floor(Math.random() * symptoms.get_commoncold.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_commoncold[Math.floor(Math.random() * causes.get_commoncold.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_commoncold[Math.floor(Math.random() * recommendations.get_commoncold.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_commoncold[Math.floor(Math.random() * drugs.get_commoncold.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_backpain":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_backpain[Math.floor(Math.random() * responses.get_backpain.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_backpain[Math.floor(Math.random() * symptoms.get_backpain.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_backpain[Math.floor(Math.random() * causes.get_backpain.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_backpain[Math.floor(Math.random() * recommendations.get_backpain.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_backpain[Math.floor(Math.random() * drugs.get_backpain.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_flu":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_flu[Math.floor(Math.random() * responses.get_flu.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_flu[Math.floor(Math.random() * symptoms.get_flu.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_flu[Math.floor(Math.random() * causes.get_flu.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_flu[Math.floor(Math.random() * recommendations.get_flu.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_flu[Math.floor(Math.random() * drugs.get_flu.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_headache":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_headache[Math.floor(Math.random() * responses.get_headache.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_headache[Math.floor(Math.random() * symptoms.get_headache.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_headache[Math.floor(Math.random() * causes.get_headache.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_headache[Math.floor(Math.random() * recommendations.get_headache.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_headache[Math.floor(Math.random() * drugs.get_headache.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_alergies":
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: responses.get_alergies[Math.floor(Math.random() * responses.get_alergies.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: symptoms.get_alergies[Math.floor(Math.random() * symptoms.get_alergies.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: causes.get_alergies[Math.floor(Math.random() * causes.get_alergies.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: recommendations.get_alergies[Math.floor(Math.random() * recommendations.get_alergies.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: drugs.get_alergies[Math.floor(Math.random() * drugs.get_alergies.length)],
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
				
				
				break;

				case "get_diarrhea":
					await Chat.query()
					.insert({
						user_id: botId,
						peer_user_id: user.id,
						message: responses.get_diarrhea[Math.floor(Math.random() * responses.get_diarrhea.length)],
						status: 'send',
						created_at: new Date,
						updated_at: new Date
					});
					await Chat.query()
					.insert({
						user_id: botId,
						peer_user_id: user.id,
						message: symptoms.get_diarrhea[Math.floor(Math.random() * symptoms.get_diarrhea.length)],
						status: 'send',
						created_at: new Date,
						updated_at: new Date
					});
					await Chat.query()
					.insert({
						user_id: botId,
						peer_user_id: user.id,
						message: causes.get_diarrhea[Math.floor(Math.random() * causes.get_diarrhea.length)],
						status: 'send',
						created_at: new Date,
						updated_at: new Date
					});
					await Chat.query()
					.insert({
						user_id: botId,
						peer_user_id: user.id,
						message: recommendations.get_diarrhea[Math.floor(Math.random() * recommendations.get_diarrhea.length)],
						status: 'send',
						created_at: new Date,
						updated_at: new Date
					});
					await Chat.query()
					.insert({
						user_id: botId,
						peer_user_id: user.id,
						message: drugs.get_diarrhea[Math.floor(Math.random() * drugs.get_diarrhea.length)],
						status: 'send',
						created_at: new Date,
						updated_at: new Date
					});
					
					
					break;


			default:
				await Chat.query()
				.insert({
					user_id: botId,
					peer_user_id: user.id,
					message: "Sorry i cannot understand you, please give me more information. For example symptoms of your illness. But if it is new symptoms, i will be sure to alert my developer so i can learn about it.",
					status: 'send',
					created_at: new Date,
					updated_at: new Date
				});
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