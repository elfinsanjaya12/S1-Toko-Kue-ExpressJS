const { BarangKeluar, Barang } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  // select semua table barang
  const barang = await Barang.findAll();
  // select semua table barang masuk 
  const barang_keluar = await BarangKeluar.findAll({
    include: [{ model: Barang }]
  });

  res.render("admin/barang_keluar/view_barang_keluar", {
    title: "Barang Masuk",
    barang: barang,
    barang_keluar: barang_keluar
  })
}

exports.actionCreate = async (req, res) => {
  const { BarangId, kode_barang_keluar, jumlah, tanggal_keluar } = req.body


  try {
    await BarangKeluar.create({
      kode_barang_keluar, BarangId, jumlah, tanggal_keluar
    })
    res.redirect("/admin/barang-keluar");
  } catch (err) {
    throw err
  }

}
