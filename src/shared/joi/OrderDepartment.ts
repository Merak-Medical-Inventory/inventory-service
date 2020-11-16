import Joi from '@hapi/joi';

export const createOrderDepartmentSchema = Joi.object().keys({
    transmitter : Joi.number().required(),
    items : Joi.array().items(Joi.object().keys({
        id : Joi.number().required(),
        amount : Joi.number().required()
    }))
});

export const acceptOrderDepartmentSchema = Joi.object().keys({
    message: Joi.string().required(),
    sender: Joi.number().required(),
    items : Joi.array().items(Joi.object().keys({
        id : Joi.number().required(),
        amount : Joi.number().required()
    }))
});

export const updateOrderDepartmentSchema = Joi.object().keys({
    response: Joi.string().required(),
    sender: Joi.number().required(),
    status : Joi.string().required(),
    dateResponse : Joi.date().required()
});
