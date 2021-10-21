//Validation
const Joi = require('@hapi/joi')

//Registration validation
const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        password: Joi.string().min(6).max(20).required()
    })

     //validate data
     return schema.validate(data)
}

//Login validation
const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).max(20).required()
    })

     //validate data
     return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;