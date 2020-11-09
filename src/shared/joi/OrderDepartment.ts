import Joi from '@hapi/joi';

export const createOrderDepartmentSchema = Joi.object().keys({
    transmitter : Joi.number().required(),
    items : Joi.array().items(Joi.object().keys({
        id : Joi.number().required(),
        amount : Joi.number().required()
    }))
});

export const acceptOrderDepartmentSchema = Joi.object().keys({
    items : Joi.array().items(Joi.object().keys({
        id : Joi.number().required(),
        amount : Joi.number().required()
    }))
});

export const updateOrderDepartmentSchema = Joi.object().keys({
    status : Joi.string()
});
