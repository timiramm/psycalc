/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      password: '$2b$10$8Lkg6hKjHl8P4ba68Tgnwu3jcHAB8BMle8yF3tZPr3M6GusER/0Pi',
      email: 'admin@gmail.com',
      avatar: 'https://i1.sndcdn.com/artworks-VxZqQccFax7YLESD-q7XHUg-t500x500.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
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
