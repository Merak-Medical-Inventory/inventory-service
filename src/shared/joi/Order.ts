import Joi from '@hapi/joi';

export const createOrderSchema = Joi.object().keys({
    user : Joi.number().required(),
    provider : Joi.number().required(),
    items : Joi.array().items(Joi.object().keys({
        id : Joi.number().required(),
        amount : Joi.number().required()
    }))
})

export const updateOrderSchema = Joi.object().keys({
    status : Joi.string()
})