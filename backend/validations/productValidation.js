const Joi = require("joi");

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    category: Joi.string().required(),
    price: Joi.number().positive().required(),
    tag: Joi.string().allow("", null).optional(),
    description: Joi.string().allow("", null).optional(),
    image: Joi.string().uri().allow("", null).optional(),
    inStock: Joi.boolean().optional(),
    stockCount: Joi.number().integer().min(0).optional(),
  });

  return schema.validate(product);
};

module.exports = { validateProduct };
