import joi from "joi"

export default async (input: any) => {
		const preForgotSchema = joi.object({
			email: joi.string().trim().required().messages({
				"string.base": "email  should be a type of 'text'",
				"string.empty": "email  cannot be empty",
				"any.required": "email  is required",
			}),
		});

		let { error, value } = preForgotSchema.validate(input, { abortEarly: false });
		let newError
		if (error) {
			newError = error.message.split(".");
		}
	
		return { errors: newError || null, value };
};
