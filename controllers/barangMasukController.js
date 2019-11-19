const {
  BarangMasuk,
  Barang,
  Persediaan,
  History,
  Produksi
} = require('../models')
const Op = require("sequelize").Op

/*
* view barang masuk
* GET
* /admin/barang-masuk
*/
exports.viewBarangMasuk = async (req, res) => {
  // select semua table barang
  const barang = await Barang.findAll();
  // select semua table barang masuk 
  const barang_masuk = await BarangMasuk.findAll({
    include: [
      { model: Barang }
    ],
    order: [
      ['id', 'DESC']
    ],
  });

  res.render("admin/barang_masuk/view_barang_masuk", {
    title: "Barang Masuk",
    barang: barang,
    barang_masuk: barang_masuk
  })
}

/*
* action create barang masuk
* POST
* /admin/barang-masuk/create
*/
exports.actionCreate = async (req, res) => {
  var {
    BarangId,
    jumlah,
    tanggal_masuk
  } = req.body

  try {
    const barang = await Persediaan.findOne({
      where: { id: { [Op.eq]: BarangId } }
    })
    if (barang !== null || barang !== "") {
      barang.stok += Number(jumlah)
      await barang.save();

      /* membuat kode barang automatic */
      const barang_masuk = await BarangMasuk.findAll({
        order: [
          ['id', 'DESC'],
        ],
      })
      /** ambil data kode barang paling akhir dengan desc */
      const data = barang_masuk[0].kode_barang_masuk;
      var reg = /\d/g;
      var match = data.match(reg);
      let tampung = '';
      if (match.length > 0) {
        for (let i = 0; i < match.length; i++) {
          tampung += match[i];
        }
      }
      var auto = Number(tampung) + 1;
      var kode = "BM-OO";
      let code_auto = kode + auto;
      /* akhir kode barang automatic */

      BarangMasuk.create({
        kode_barang_masuk: code_auto,
        BarangId,
        jumlah,
        tanggal_masuk
      }).then((barang_masuk) => {
        Produksi.findOne({
          where: {
            tanggal: { [Op.eq]: barang_masuk.tanggal_masuk }
          }
        }).then((produksi_cek) => {
          console.log(produksi_cek)
          if (produksi_cek === null) {

            Produksi.create({
              produksi: jumlah, //barang_masuk.jumlah
              jumlah_persediaan: jumlah,//produksi_cek.produksi + jumlah - produksi_cek.permintaan
              tanggal: tanggal_masuk
            }).then((create_produksi) => {
              console.log(create_produksi)
              console.log("else")
              res.redirect("/admin/barang-masuk");
            }).catch((err) => {
              res.redirect("/admin/barang-masuk");
            });
          } else {

            return produksi_cek.update({
              produksi: Number(produksi_cek.produksi) + Number(barang_masuk.jumlah),
              jumlah_persediaan: Number(produksi_cek.produksi) + Number(jumlah) - Number(produksi_cek.permintaan),
              tanggal: tanggal_masuk
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
        res.redirect("/admin/barang-masuk");
      });

      // cek table produksi berdasarkan tanggal barang masuk 
      // jika tanggal produksi ada makan update produksi
      // selain itu create produksi baru

    }
  } catch (err) {
    throw err
  }
}

/*
* action delete barang masuk
* DELETE
* /admin/barang-masuk/delete/:id
*/
exports.actionBarangMasukDetele = async (req, res) => {
  let { id } = req.params;
  const barang = await BarangMasuk.findOne({
    where: { id: { [Op.eq]: id } }
  })

  if (barang) {
    const min_barang = await Persediaan.findOne({
      where: {
        BarangId: { [Op.eq]: barang.BarangId }
      }
    })
    if (min_barang) {
      min_barang.stok -= barang.jumlah
      await min_barang.save()
      barang.destroy()
      res.redirect('/admin/barang-masuk');
    }
  }
  /* jika gagal */
  res.redirect('/admin/barang-masuk');
}

/*
* action update barang masuk
* POST
* /admin/barang-masuk/update/
*/

exports.actionUpdate = async (req, res) => {
  const {
    id,
    BarangId,
    kode_barang_masuk,
    jumlah,
    tanggal_masuk
  } = req.body

  const updateBarangMasuk = await BarangMasuk.findOne({
    where: {
      id: { [Op.eq]: id }
    }
  })

  if (updateBarangMasuk) {
    updateBarangMasuk.BarangId = kode_barang
    updateBarangMasuk.kode_barang_masuk = nama_barang
    updateBarangMasuk.satuan = satuan
    updateBarangMasuk.harga = harga
    await updateBarangMasuk.save()
  }
  res.redirect('/admin/barang')
}