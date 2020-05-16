'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    description: DataTypes.STRING,
    draft: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
    },
  }, {});
  Poll.associate = function(models) {
    Poll.belongsTo(models.User,{foreignKey:'userId',onDelete:'cascade'});
  };
  return Poll;
};