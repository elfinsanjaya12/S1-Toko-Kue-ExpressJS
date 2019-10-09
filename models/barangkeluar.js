'use strict';
module.exports = (sequelize, DataTypes) => {
  const BarangKeluar = sequelize.define('BarangKeluar', {
    kode_barang_keluar: DataTypes.STRING,
    BarangId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    tanggal_keluar: DataTypes.DATE
  }, {});
  BarangKeluar.associate = function (models) {
    // associations can be defined here
    BarangKeluar.belongsTo(sequelize.models.Barang, {
      foreignKey: "BarangId"
    });
  };
  return BarangKeluar;
};