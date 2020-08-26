import Joi from '@hapi/joi';

export const createProviderSchema = Joi.object().keys({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().required(),
    phone_number: Joi.string().required(),
    items : Joi.array().required()
});

export const updateProviderSchema = Joi.object().keys({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().required(),
    phone_number: Joi.string().required(),
    items : Joi.array().required()
});

