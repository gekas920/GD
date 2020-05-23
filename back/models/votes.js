'use strict';
module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Poll',
        key: 'id'
      }
    }
  }, {});
  Votes.associate = function(models) {
    Votes.belongsTo(models.User,{foreignKey:'userId',onDelete:'cascade'});
    Votes.belongsTo(models.Poll,{foreignKey:'pollId',onDelete:'cascade'});
  };
  return Votes;
};