import joi from "joi"

export default async (input: any) => {
		const postForgotSchema = joi.object({
			id: joi.string().trim().required().messages({
				"string.base": "id  should be a type of 'text'",
				"string.empty": "id  cannot be empty",
				"any.required": "id  is required",
			})
		});

		let { error, value } = postForgotSchema.validate(input, { abortEarly: false });
		let newError
		if (error) {
			newError = error.message.split(".");
		}
	
		return { errors: newError || null, value };
};
