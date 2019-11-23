const { Produksi, Barang, Persediaan } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  const produksi = await Produksi.findAll()
  res.render("pimpinan/laporan/view_laporan", {
    title: "Laporan",
    produksi
  })
}

exports.viewPersediaan = async (req, res) => {
  const persedian_barang = await Persediaan.findAll({
    include: [{ model: Barang }]
  })

  const barang = await Barang.findAll({
    where: {
      status: { [Op.eq]: "Nonactive" }
    }
  })

  console.log("masuk")

  res.render("pimpinan/persedian_barang/view_persediaan_barang", {
    title: "Persediaan Barang",
    persedian_barang: persedian_barang,
    barang: barang,
  })
}
