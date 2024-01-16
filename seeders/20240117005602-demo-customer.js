'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('customers', [{
      name: 'John Doe',
      cpf: '12345678900',
      balance: 1000,
      numberAccount: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      name: 'Jane Doe',
      cpf: '12345678911',
      balance: 1000,
      numberAccount: '321',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('customers', null, {});
  }
};
