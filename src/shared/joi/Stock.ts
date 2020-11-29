import Joi from "@hapi/joi";

export const updateStockSchema = Joi.object().keys({
    criticUnit : Joi.number()
});

export const outputItemStockSchema = Joi.object().keys({
    amountOutput : Joi.number()
});
