const { Barang } = require('../models')
const Op = require("sequelize").Op

exports.viewBarang = async (req, res) => {
  const barang = await Barang.findAll()

  res.render("admin/barang/view_barang", {
    title: "Barang",
    barang: barang
  })
}

exports.actionCreate = async (req, res) => {
  const {
    nama_barang,
    satuan,
    harga
  } = req.body


  try {
    /* membuat kode barang automatic */
    const barang = await Barang.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })

    // ambil data kode barang paling akhir dengan desc
    const data = barang[0].kode_barang;
    var reg = /\d/g;
    var match = data.match(reg);
    let tampung = '';
    if (match.length > 0) {
      for (let i = 0; i < match.length; i++) {
        tampung += match[i];
      }
    }
    var auto = Number(tampung) + 1;
    var kode = "B-OO";
    let code_auto = kode + auto;
    /* akhir kode barang automatic */

    await Barang.create({
      kode_barang: code_auto,
      nama_barang,
      satuan,
      harga,
      status: "Nonactive"
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