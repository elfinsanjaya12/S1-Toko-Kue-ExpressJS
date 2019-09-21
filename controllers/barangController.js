const { Barang } = require('../models')

exports.viewBarang = async (req, res) => {
  const barang = await Barang.findAll()
  res.render("admin/barang/barang", {
    barang: barang
  })
}