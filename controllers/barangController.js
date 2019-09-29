const { Barang } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  const barang = await Barang.findAll()
  res.render("admin/barang/view_barang", {
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

exports.actionDetele = async (req, res) => {
  let { id } = req.params;
  const barang = await Barang.findOne({ where: { id: { [Op.eq]: id } } })
  barang.destroy()
  res.redirect('/admin/barang');
}

exports.actionUpdate = async (req, res) => {
  const { id, kode_barang, nama_barang, satuan, harga } = req.body

  const updateBarang = await Barang.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateBarang) {
    updateBarang.kode_barang = kode_barang
    updateBarang.nama_barang = nama_barang
    updateBarang.satuan = satuan
    updateBarang.harga = harga
    await updateBarang.save()
  }
  res.redirect('/admin/barang')
}