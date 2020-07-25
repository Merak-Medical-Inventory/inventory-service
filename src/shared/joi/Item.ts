import Joi from '@hapi/joi';

export const createItemSchema = Joi.object().keys({
    code: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    brand_code: Joi.string(),
    serial_number : Joi.string().required(),
    category : Joi.number().required(),
    brand : Joi.number().required(),
    presentation : Joi.number().required()
});

export const updateItemSchema = Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    brand_code: Joi.string(),
    serial_number : Joi.string(),
    category : Joi.number(),
    brand : Joi.number(),
    presentation : Joi.number()
});

