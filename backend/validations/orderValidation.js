const Joi = require("joi");

const validateOrder = (order) => {
  const schema = Joi.object({
    customer_name: Joi.string().min(2).required(),
    customer_email: Joi.string().email().allow("", null).optional(),
    customer_phone: Joi.string().min(7).required(),
    shipping_address: Joi.string().min(5).required(),
    payment_method: Joi.string().valid("cash_on_delivery", "member_card", "card").default("cash_on_delivery"),
    notes: Joi.string().allow("", null).optional(),
    items: Joi.array()
      .items(
        Joi.object({
          product_id: Joi.number().optional().allow(null),
          name: Joi.string().required(),
          price: Joi.number().positive().required(),
          quantity: Joi.number().integer().positive().required(),
          image: Joi.string().allow("", null).optional(),
        })
      )
      .min(1)
      .required(),
  });

  return schema.validate(order);
};

module.exports = { validateOrder };
