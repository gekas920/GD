'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Fields',[
      {
        name:'Russian blue cat',
        count:2,
        pollId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Siberian cat',
        count:0,
        pollId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Black cat',
        count:1,
        pollId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Bulldog',
        count:3,
        pollId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Husky',
        count:2,
        pollId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:'Corgi',
        count:0,
        pollId:2,
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
