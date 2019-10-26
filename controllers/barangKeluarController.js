const { BarangKeluar, Barang, Persediaan } = require('../models')
const Op = require("sequelize").Op

exports.viewBarangKeluar = async (req, res) => {
  // select semua table barang
  const barang = await Barang.findAll();
  // select semua table barang masuk 
  const barang_keluar = await BarangKeluar.findAll({
    include: [{ model: Barang }]
  });

  res.render("admin/barang_keluar/view_barang_keluar", {
    title: "Barang Keluar",
    barang: barang,
    barang_keluar: barang_keluar
  })
}

exports.actionCreate = async (req, res) => {
  const {
    BarangId,
    jumlah,
    tanggal_keluar
  } = req.body

  try {
    const barang = await Persediaan.findOne({
      where: { id: { [Op.eq]: BarangId } }
    })
    if (barang !== null || barang !== "") {
      barang.stok -= Number(jumlah)
      await barang.save();


      /* membuat kode barang automatic */
      const barang_keluar = await BarangKeluar.findAll({
        order: [
          ['id', 'DESC'],
        ],
      })
      // ambil data kode barang paling akhir dengan desc
      const data = barang_keluar[0].kode_barang_keluar;
      var reg = /\d/g;
      var match = data.match(reg);
      let tampung = '';
      if (match.length > 0) {
        for (let i = 0; i < match.length; i++) {
          tampung += match[i];
        }
      }
      var auto = Number(tampung) + 1;
      var kode = "BK-OO";
      let code_auto = kode + auto;
      /* akhir kode barang automatic */
      await BarangKeluar.create({
        kode_barang_keluar: code_auto,
        BarangId,
        jumlah,
        tanggal_keluar
      })
      res.redirect("/admin/barang-keluar");
    }
    res.redirect("/admin/barang-keluar");
  } catch (err) {
    throw err
  }

}
