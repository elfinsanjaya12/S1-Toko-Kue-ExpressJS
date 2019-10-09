'use strict';
module.exports = (sequelize, DataTypes) => {
  const BarangMasuk = sequelize.define('BarangMasuk', {
    kode_barang_masuk: DataTypes.STRING,
    BarangId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    tanggal_masuk: DataTypes.DATE
  }, {});
  BarangMasuk.associate = function (models) {
    // associations can be defined here
    BarangMasuk.belongsTo(sequelize.models.Barang, {
      foreignKey: "BarangId"
    });
  };
  return BarangMasuk;
};