'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    initials: DataTypes.STRING,
    date: DataTypes.DATE,
    about: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    deleted:DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
  };
  return User;
};