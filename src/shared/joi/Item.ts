import Joi from '@hapi/joi';

export const createItemSchema = Joi.object().keys({
    code: Joi.string().required(),
    brand_code: Joi.string(),
    generalItem: Joi.number(),
    category : Joi.number().required(),
    brand : Joi.number().required(),
    presentation : Joi.number().required()
});

export const updateItemSchema = Joi.object().keys({
    code: Joi.string(),
    brand_code: Joi.string(),
    generalItem: Joi.number(),
    category : Joi.number(),
    brand : Joi.number(),
    presentation : Joi.number()
});

