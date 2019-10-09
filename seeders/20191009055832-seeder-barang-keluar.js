'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('BarangKeluars', [{
      kode_barang_keluar: 'BK-001',
      BarangId: 1,
      jumlah: 20,
      tanggal_keluar: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BarangKeluars', null, {});
  }
};
