'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reasons',[
      {
        type:'Sexual content',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type:'Invalid poll',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type:'Advertisement',
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
