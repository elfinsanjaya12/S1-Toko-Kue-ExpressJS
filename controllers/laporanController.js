const { Produksi } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  const produksi = await Produksi.findAll()
  res.render("admin/laporan/view_laporan", {
    title: "Barang",
    produksi
  })
}