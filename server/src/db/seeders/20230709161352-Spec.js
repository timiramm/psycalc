/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Specs', [{
      title: 'Лекции',
      hour: 0,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Тематические группы',
      hour: 0,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Личная терапия',
      hour: 0,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Проведение личной терапии',
      hour: 0,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
