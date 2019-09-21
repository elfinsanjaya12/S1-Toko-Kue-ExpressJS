'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Persediaans', [{
      BarangId: 1,
      tanggal_persediaan: new Date(),
      stok: 10
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Persediaans', null, {});

  }
};
