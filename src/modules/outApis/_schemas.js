const Joi = require("joi");

const payoutSchema = {
  body: Joi.object({
    amount: Joi.number().required().description("Сумма в сумах"),
    cardNumber: Joi.string().required().description("Номер карты"),
    transactionData: Joi.string()
      .required()
      .description("Дополнительная информация по платежу"),
    pinfl: Joi.string().required().description("ПИНФЛ"),
  }),
};

module.exports = { payoutSchema };
