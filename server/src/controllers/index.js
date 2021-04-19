const { createTime } = require('../services');

const healthCheck = (_, res) => {
  res.status(200).send();
};

const registerTime = async (req, res, next) => {
  const registeredTime = {};
  const { milliseconds, seconds } = req.body;
  if (milliseconds != undefined) {
    registeredTime.milliseconds = milliseconds;
  } else {
    registeredTime.seconds = seconds;
  }
  const { newTime, error } = await createTime(registeredTime);
  if (error) return next(error);
  return res.status(201).json(newTime);
};

// Handle errors based on type. When it's a Joi error, treat them as
// "BAD REQUEST" and append an explanation. Otherwise, send an "INTERNAL"
// error
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
