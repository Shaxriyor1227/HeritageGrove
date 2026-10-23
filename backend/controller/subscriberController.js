const { Subscriber } = require("../models");
const { validateSubscriber } = require("../validations/subscriberValidation");

exports.subscribe = async (req, res) => {
  const { error } = validateSubscriber(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const email = req.body.email.trim().toLowerCase();

  try {
    const existing = await Subscriber.findOne({ where: { email } });
    if (existing) {
      return res.status(200).json({
        message: "You're already on the list.",
        alreadySubscribed: true,
      });
    }

    const subscriber = await Subscriber.create({ email });
    return res.status(201).json({
      message: "Thank you — you're on the list.",
      subscriber,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json(subscribers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByPk(req.params.id);
    if (!subscriber) return res.status(404).send("Subscriber not found");

    const data = subscriber.toJSON();
    await subscriber.destroy();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
