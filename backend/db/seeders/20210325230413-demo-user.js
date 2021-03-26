'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {
       username: 'Light',
       email: 'light@note.com',
       hashedPassword: bcrypt.hashSync('password')
     },
     {
       username: 'L',
       email: faker.internet.email(),
       hashedPassword: bcrypt.hashSync(faker.internet.password())
     },
     {
       username: 'Frank',
       email: faker.internet.email(),
       hashedPassword: bcrypt.hashSync(faker.internet.password())
     },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
  
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Light', 'L', 'Frank']}
    }, {});
  }
};
