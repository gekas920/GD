'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login:'admin',
      password:'$2b$10$n0uqu7c03bPVtc3qGh4kx.okPqYlvf9Mdvr0T.v0rPGdQFIdg7bfG',
      email:'example@gmail.com',
      date:'1999-12-23T00:00:00.000Z',
      about:'SUPER PUPER ADMIN THE BEST',
      initials:'Putin Vladimir Vladimirovich',
      admin:true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
