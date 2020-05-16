'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reason = sequelize.define('Reason', {
    type: DataTypes.STRING
  }, {});
  Reason.associate = function(models) {
    // associations can be defined here
  };
  return Reason;
};