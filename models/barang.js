'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define('Barang', {
    kode_barang: DataTypes.STRING,
    nama_barang: DataTypes.STRING,
    satuan: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {});
  Barang.associate = function(models) {
    // associations can be defined here
  };
  return Barang;
};