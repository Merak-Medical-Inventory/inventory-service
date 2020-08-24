import Joi from '@hapi/joi';

export const createGeneralItemSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
});
