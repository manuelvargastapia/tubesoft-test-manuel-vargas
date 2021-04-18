const { Times } = require('../models');

const createTime = async (registeredTime) => {
  const returnData = { newTime: null, error: null };
  try {
    returnData.newTime = await Times.create({ registeredTime });
  } catch (error) {
    returnData.error = error;
  }
  return returnData;
};

module.exports = { createTime };
