'use strict';
module.exports = (sequelize, DataTypes) => {
  const PollCategory = sequelize.define('PollCategory', {
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Poll',
        key: 'id'
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      },
    },
  }, {});
  PollCategory.associate = function(models) {
    PollCategory.belongsTo(models.Poll,{foreignKey:'pollId',onDelete:'cascade'});
    PollCategory.belongsTo(models.Category,{foreignKey:'categoryId',onDelete:'cascade'})
  };
  return PollCategory;
};