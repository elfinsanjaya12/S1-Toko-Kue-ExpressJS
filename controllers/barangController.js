const { Barang } = require('../models')

exports.viewBarang = async (req, res) => {
  const barang = await Barang.findAll()
  res.render("admin/barang/barang", {
    barang: barang
  })
}

exports.actionCreate = async (req, res) => {
  const { kode_barang, nama_barang, satuan, harga } = req.body

  try {
    await Barang.create({
      kode_barang, nama_barang, satuan, harga
    })
    res.redirect("/admin/barang");
  } catch (err) {
    throw err
  }

}