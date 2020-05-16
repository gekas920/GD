'use strict';
module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,
    correct: DataTypes.BOOLEAN,
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Poll',
        key: 'id'
      },
    },
  }, {});
  Field.associate = function(models) {
    Field.belongsTo(models.Poll,{foreignKey:'pollId',onDelete:'cascade'})
  };
  return Field;
};