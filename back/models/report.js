'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    description: DataTypes.STRING,
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
    },
    reasonId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reason',
        key: 'id'
      }
    },
  }, {});
  Report.associate = function(models) {
    Report.belongsTo(models.Reason,{foreignKey:'reasonId',onDelete:'cascade'});
    Report.belongsTo(models.User,{foreignKey:'userId',onDelete:'cascade'});
    Report.belongsTo(models.Poll,{foreignKey:'pollId',onDelete:'cascade'});
  };
  return Report;
};