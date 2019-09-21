'use strict';
module.exports = (sequelize, DataTypes) => {
  const Persediaan = sequelize.define('Persediaan', {
    BarangId: DataTypes.INTEGER,
    tanggal_persediaan: DataTypes.DATE,
    stok: DataTypes.INTEGER
  }, {});
  Persediaan.associate = function(models) {
    // associations can be defined here
  };
  return Persediaan;
};