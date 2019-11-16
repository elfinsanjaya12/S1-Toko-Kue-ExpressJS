'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produksi = sequelize.define('Produksi', {
    tanggal: DataTypes.DATE,
    produksi: DataTypes.INTEGER,
    permintaan: DataTypes.INTEGER,
    jumlah_persediaan: DataTypes.INTEGER
  }, {});
  Produksi.associate = function(models) {
    // associations can be defined here
  };
  return Produksi;
};