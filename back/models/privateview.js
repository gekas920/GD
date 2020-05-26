'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrivateView = sequelize.define('PrivateView', {
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
  PrivateView.associate = function(models) {
    PrivateView.belongsTo(models.User,{foreignKey:'userId',onDelete:'cascade'});
    PrivateView.belongsTo(models.Poll,{foreignKey:'pollId',onDelete:'cascade'});
  };
  return PrivateView;
};