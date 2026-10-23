const Joi = require("joi");

const validateSubscriber = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().max(254).required(),
  });

  return schema.validate(data);
};

module.exports = { validateSubscriber };
