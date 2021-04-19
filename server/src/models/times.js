'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Times extends Model {
    // Override `toJSON()` to hide `id` field, as we don't need it
    // nor want to expose it. Also, only return existent values
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        milliseconds: this.milliseconds != null ? this.milliseconds : undefined,
        seconds: this.seconds != null ? this.seconds : undefined,
      };
    }
  }

  Times.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      milliseconds: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 2147483647,
        },
      },
      seconds: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 2147483647,
        },
      },
    },
    {
      sequelize,
      modelName: 'Times',
      validate: {
        // Custom validator to ensure throwing an error if, even after
        // previous validations, still some invalid data are tried to
        // be stored
        onlyOneOfTheFields() {
          if (this.milliseconds && this.seconds) {
            throw new Error(
              "milliseconds and seconds can't be present simultaneously."
            );
          }
        },
      },
    }
  );

  return Times;
};
