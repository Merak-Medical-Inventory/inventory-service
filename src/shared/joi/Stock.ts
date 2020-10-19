import Joi from "@hapi/joi";

export const updateStockSchema = Joi.object().keys({
    amount: Joi.number(),
    criticUnit : Joi.number()
});
