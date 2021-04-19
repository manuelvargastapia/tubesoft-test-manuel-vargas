const { Times } = require('../models');

module.exports = async (registeredTime) => {
  const returnData = { newTime: null, error: null };
  try {
    returnData.newTime = await Times.create(registeredTime);
  } catch (error) {
    returnData.error = error;
  }
  return returnData;
};
