import joi from "joi";

// Validation for Signup
export const ValidateSignup = (userData) => {
    const Schema = joi.object({
        fullname: joi.string().required().min(14),
        email: joi.string().required().email(),
        password: joi.string().required().min(10),
        address: joi.array().items(joi.object({detail: joi.string(), for: joi.string()})),
        phoneNumber: joi.number()
    });

    return Schema.validateAsync(userData);
}

// Validation for SignIn
export const ValidateSignin = (userData) => {
    const Schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(10),
    });

    return Schema.validateAsync(userData);
}