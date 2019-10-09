const { BarangMasuk, Barang } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  const barang_masuk = await BarangMasuk.findAll({
    include: [{ model: Barang }]
  })
  console.log(barang_masuk);
  res.render("admin/barang_masuk/view_barang_masuk", {
    title: "Barang Masuk",
    barang_masuk: barang_masuk
  })
}
