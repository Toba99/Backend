const joi = require("joi");

export default async (input: any) => {
	const registerSchema = joi.object({
		firstName: joi.string().trim().min(3).max(30).required().messages({
			"string.base": "firstName should be a type of 'text'",
			"string.empty": "firstName cannot be empty",
			"string.min": "firstName should have a minimum length of {#limit}",
			"string.max": "firstName should have a maximum length of {#limit}",
			"any.required": "firstName is required",
		}),
		lastName: joi.string().trim().min(3).max(30).required().messages({
			"string.base": "lastName should be a type of 'text'",
			"string.empty": "lastName cannot be empty",
			"string.min": "lastName should have a minimum length of {#limit}",
			"string.max": "lastName should have a maximum length of {#limit}",
			"any.required": "lastName is required",
		}),
		email: joi.string().trim().email({ minDomainSegments: 2 }).messages({
			"string.base": "Email should be a type of 'text'",
			"string.empty": "Email cannot be empty",
			"string.email": "This is not a valid email",
			"any.required": "Email is required",
		}),

		password: joi.string().min(8).messages({
			"string.base": "Password should be a type of 'text'",
			"string.empty": "Password cannot be empty",
			"string.min": "Password must be minimum of 8 characters",
		}),
	});

	let { error, value } = registerSchema.validate(input, { abortEarly: false });
	let newError
	if (error) {
		newError = error.message.split(".");
	}

	return { errors: newError || null, value };
};
