'use strict';

const { createTime } = require('../services');

module.exports = async (req, res, next) => {
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
