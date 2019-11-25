const Joi = require('@hapi/joi');

module.exports = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    rut: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    chilenRUT: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    gender: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    address: Joi.array()
        .items(Joi.string().min(3)
        .max(30))
        .required(),

    phone: Joi.number()
        .min(3)
        //.max(4)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

})
    .with('username', 'birth_year')
    //.xor('password', 'access_token')
    //.with('password', 'repeat_password');
