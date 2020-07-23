import Joi from '@hapi/joi';

export const createPresentationSchema = Joi.object().keys({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    measure: Joi.string().required(),
    measure_value: Joi.number().required()
});
