'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Barangs', [{
      kode_barang: "B-001",
      nama_barang: "Kue Pancong",
      satuan: "Lusin",
      harga: 10000
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Barangs', null, {});
  }
};
