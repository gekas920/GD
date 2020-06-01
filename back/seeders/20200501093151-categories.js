'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories',[
      {
        type:'Animals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type:'Humour',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type:'Choose right',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type:'Other',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
