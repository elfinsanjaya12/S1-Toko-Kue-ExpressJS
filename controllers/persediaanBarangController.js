const { Barang, Persediaan } = require('../models')
const Op = require("sequelize").Op

exports.viewPersediaan = async (req, res) => {
  const persedian_barang = await Persediaan.findAll({
    include: [{ model: Barang }]
  })

  const barang = await Barang.findAll({
    where: {
      status: { [Op.eq]: "Nonactive" }
    }
  })

  res.render("admin/persediaan_barang/view_persediaan_barang", {
    title: "Persediaan Barang",
    persedian_barang: persedian_barang,
    barang: barang,
  })
}

exports.actionPersediaanCreate = (req, res) => {
  const { tanggal_persediaan, BarangId } = req.body
  Persediaan.create({
    tanggal_persediaan,
    BarangId,
    stok: 0
  }).then(() => {
    res.redirect('/admin/persediaan-barang')
  }).catch((err) => {
    res.redirect('/admin/persediaan-barang')
  });
}