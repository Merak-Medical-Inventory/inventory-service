import Joi from '@hapi/joi';

export const createProviderSchema = Joi.object().keys({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().required(),
    phone_number: Joi.string().required(),
    items : Joi.array().required(),
    description : Joi.string().required(),
    city : Joi.string().required(),
    country : Joi.string().required(),
    address : Joi.string().required(),
    email : Joi.string().required()
});

export const updateProviderSchema = Joi.object().keys({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().required(),
    phone_number: Joi.string().required(),
    items : Joi.array().required(),
    description : Joi.string().required(),
    city : Joi.string().required(),
    country : Joi.string().required(),
    address : Joi.string().required(),
    email : Joi.string().required()
});

