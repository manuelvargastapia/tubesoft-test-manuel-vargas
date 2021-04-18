const { Times } = require('../models');

const healthCheck = (_, res) => {
  res.status(200).send();
};

const registerTime = async (req, res, next) => {
  try {
    const newTime = await Times.create({
      registeredTime: req.body.registeredTime,
    });
    return res.status(201).json(newTime);
  } catch (error) {
    next(error);
  }
};

const errorHandler = (err, _, res, __) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      error: `Invalid data in ${err.type}`,
      message: err.error.toString(),
    });
  } else {
    res
      .status(500)
      .json({ error: 'Internal server error', message: err.message });
  }
};

module.exports = { healthCheck, registerTime, errorHandler };
