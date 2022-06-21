import joi from "joi"

export default async (input: any) => {
		const postForgotSchema = joi.object({
			message: joi.string().trim().required().messages({
				"string.base": "message  should be a type of 'text'",
				"string.empty": "message  cannot be empty",
				"any.required": "message  is required",
			})
		});

		let { error, value } = postForgotSchema.validate(input, { abortEarly: false });
		let newError
		if (error) {
			newError = error.message.split(".");
		}
	
		return { errors: newError || null, value };
};
