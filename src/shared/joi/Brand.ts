import Joi from '@hapi/joi';

export const createBrandSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
});
