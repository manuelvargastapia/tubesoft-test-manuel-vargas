'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Times extends Model {
    // Override `toJSON()` to hide `id` field, as we don't need
    // or want to expose it
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  Times.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      registeredTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Times',
    }
  );

  return Times;
};
