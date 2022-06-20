import { Request, Response } from "express"
const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const avatar64Validation = require("../../validations/user/avatar64Validation");

const bucketName = process.env.BUCKET_NAME;

export default async (req: Request, res: Response) => {
	try {
		const { errors, value } = await avatar64Validation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		const { image } = value;

		const dataArr = image.split(",");
		if (
			dataArr.includes("data:image/jpeg;base64") !== true &&
			dataArr.includes("data:image/png;base64") !== true
		) {
			return res.status(406).send({
				message: "Your avatar must be of type jpg, jpeg or png",
				status: false,
			});
		}

		const userId = req.user.id;
		const user = await User.query().findOne({
			id: userId,
		});

		if (!user) {
			return res.status(409).send({
				status: false,
				data:{},
				message: "User does not exist",
			});
		}


		const imageBuffer = Buffer.from(dataArr[1], "base64");

		const filename = `${uuidv4()}`;

		const size600 = await sharp(imageBuffer).resize(600, 600).jpeg().toBuffer();
		const size100 = await sharp(imageBuffer).resize(100, 100).jpeg().toBuffer();

		// await storage.bucket(bucketName).file(`${filename}.jpeg`).save(size100);
		// await storage.bucket(bucketName).file(`${filename}-600.jpeg`).save(size600);

		const avatar = `https://storage.url.com/${bucketName}/${filename}.jpeg`;

		await User.query()
			.where({
				id: userId,
			})
			.update({
				avatar,
				updated_at: new Date(),
			})
			.catch((error: any) => {
				console.log(error.message);
				return res.status(400).send({
					status: false,
					data:{},
					message: "Failed to upload avatar - please try again later",
				});
			});


		return res.status(201).send({
			message: "Avatar updated",
			status: true,
		});
	} catch (error: any) {
		console.log("Avatar Base64 =======>", error.message);
		return res.status(500).send({
			message: "Please try again in a few minutes",
			status: false,
		});
	}
};
