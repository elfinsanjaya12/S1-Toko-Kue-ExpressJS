'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Barangs', [
      {
        kode_barang: "B-OO1",
        nama_barang: "Kue Pancong",
        satuan: "Lusin",
        harga: 10000,
        status: "Active"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Barangs', null, {});
  }
};
