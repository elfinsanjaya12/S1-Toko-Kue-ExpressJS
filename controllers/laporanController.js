const { Barang } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  const barang = await Barang.findAll()
  res.render("admin/laporan/view_laporan", {
    title: "Barang",
  })
}