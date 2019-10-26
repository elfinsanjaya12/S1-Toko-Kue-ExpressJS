'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BarangMasuks', [{
      kode_barang_masuk: 'BM-OO1',
      BarangId: 1,
      jumlah: 20,
      tanggal_masuk: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BarangMasuks', null, {});

  }
};
