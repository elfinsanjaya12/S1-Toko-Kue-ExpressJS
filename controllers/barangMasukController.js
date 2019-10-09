const { BarangMasuk, Barang } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  // select semua table barang
  const barang = await Barang.findAll();
  // select semua table barang masuk 
  const barang_masuk = await BarangMasuk.findAll({
    include: [{ model: Barang }]
  });

  res.render("admin/barang_masuk/view_barang_masuk", {
    title: "Barang Masuk",
    barang: barang,
    barang_masuk: barang_masuk
  })
}

exports.actionCreate = async (req, res) => {
  const { BarangId, kode_barang_masuk, jumlah, tanggal_masuk } = req.body


  try {
    await BarangMasuk.create({
      kode_barang_masuk, BarangId, jumlah, tanggal_masuk
    })
    res.redirect("/admin/barang-masuk");
  } catch (err) {
    throw err
  }

}
