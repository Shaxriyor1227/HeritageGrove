const Joi = require("joi");

const validateCustomerCard = (customerCard) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    number: Joi.string().min(3).required(),
    customer_id: Joi.number().integer().required(),
    year: Joi.number().integer().required(),
    month: Joi.number().integer().min(1).max(12).required(),
    is_active: Joi.boolean().required(),
    is_main: Joi.boolean().required(),
  });

  return schema.validate(customerCard);
};

module.exports = { validateCustomerCard };
