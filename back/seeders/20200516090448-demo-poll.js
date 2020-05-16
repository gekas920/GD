'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Polls',[
      {
        description:'Most beautiful cat',
        draft:false,
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description:'Most beautiful dog',
        draft:false,
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
