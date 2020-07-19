import Joi from '@hapi/joi';

export const createCategorySchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
});
