import Joi from '@hapi/joi';

export const createLotsSchema = Joi.object().keys({
    order : Joi.number().required(),
    items : Joi.array().items(Joi.object().keys({
        id : Joi.number().required(),
        dueDate : Joi.date().required(),
        amount : Joi.number().required()
    }).required()).required()
});