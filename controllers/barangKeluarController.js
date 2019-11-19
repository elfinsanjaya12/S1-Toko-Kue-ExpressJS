const { BarangKeluar, Barang, Persediaan, Produksi } = require('../models')
const Op = require("sequelize").Op
var moment = require('moment');


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

      if (jumlah > barang.stok) {
        console.log("masuk " + jumlah);
        res.redirect("/admin/barang-keluar");
      } else {
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
        BarangKeluar.create({
          kode_barang_keluar: code_auto,
          BarangId,
          jumlah,
          tanggal_keluar
        }).then((barang_keluar_cek) => {
          Produksi.findOne({
            where: {
              tanggal: { [Op.eq]: barang_keluar_cek.tanggal_keluar }
            }
          }).then((produksi_cek) => {

            if (produksi_cek === null) {

              Produksi.create({
                permintaan: jumlah, //barang_masuk.jumlah
                jumlah_persediaan: jumlah,//produksi_cek.produksi + jumlah - produksi_cek.permintaan
                tanggal: tanggal_keluar
              }).then((create_produksi) => {
                console.log(create_produksi)
                console.log("else")
                res.redirect("/admin/barang-masuk");
              }).catch((err) => {
                res.redirect("/admin/barang-masuk");
              });
            } else {

              return produksi_cek.update({
                permintaan: Number(produksi_cek.permintaan) + Number(barang_keluar_cek.jumlah),
                jumlah_persediaan: Number(produksi_cek.produksi) - Number(jumlah) - Number(produksi_cek.permintaan),
                tanggal: tanggal_keluar
              }).then(() => {
                console.log("if")
                res.redirect("/admin/barang-masuk");
              }).catch((err) => {
                res.redirect("/admin/barang-masuk");
              });
            }
            // if (produksi !== null) {
            //   return produksi.update({
            //     produksi: produksi_cek.produksi + barang_masuk.jumlah,
            //     jumlah_persediaan: produksi_cek.produksi + jumlah - produksi_cek.permintaan,
            //     tanggal: tanggal_masuk
            //   }).then(() => {
            //     console.log("if")
            //     res.redirect("/admin/barang-masuk");
            //   }).catch((err) => {
            //     res.redirect("/admin/barang-masuk");
            //   });
            // } else {
            //   console.log("else atas" + barang_masuk)
            //   Produksi.create({
            //     produksi: 10, //barang_masuk.jumlah
            //     jumlah_persediaan: jumlah,//produksi_cek.produksi + jumlah - produksi_cek.permintaan
            //     tanggal: tanggal_masuk
            //   }).then((create_produksi) => {
            //     console.log(create_produksi)
            //     console.log("else")
            //     res.redirect("/admin/barang-masuk");
            //   }).catch((err) => {
            //     res.redirect("/admin/barang-masuk");
            //   });
            // }
          }).catch((err) => {
            res.redirect("/admin/barang-masuk");
          });
        }).catch((err) => {

        });

        // console.log(Produksi)

        // if (tanggal_hari_ini !== null) {
        //   console.log("ada di database");
        // } else {
        //   console.log("tidak ada didatabase");
        // }
        res.redirect("/admin/barang-keluar");
      }
    } else {
      res.redirect("/admin/barang-keluar");
    }
  } catch (err) {
    throw err
    res.redirect("/admin/barang-keluar");
  }

}
