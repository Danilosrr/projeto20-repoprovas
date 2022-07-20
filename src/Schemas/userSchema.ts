import joi from "joi"

export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(10),
    confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
        "any.only": "password and confirmation should match"
    })
});