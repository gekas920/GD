'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.File,{
      foreignKey:'user_id'
    })
  };
  return User;
};