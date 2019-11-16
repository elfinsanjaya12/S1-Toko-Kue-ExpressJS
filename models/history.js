'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    BarangKeluarId: DataTypes.INTEGER,
    BarangMasukId: DataTypes.INTEGER,
    PersediaanId: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
    tanggal: DataTypes.DATE
  }, {});
  History.associate = function (models) {
    // associations can be defined here
    History.belongsTo(sequelize.models.BarangMasuk, {
      foreignKey: "BarangMasukId"
    });

    History.belongsTo(sequelize.models.BarangKeluar, {
      foreignKey: "BarangKeluarId"
    });

    History.belongsTo(sequelize.models.Persediaan, {
      foreignKey: "PersediaanId"
    });

  };
  return History;
};