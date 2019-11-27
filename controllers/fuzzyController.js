const { Produksi } = require('../models')
const Op = require("sequelize").Op

exports.viewFuzzy = async (req, res) => {
  let { tanggal_awal, tanggal_akhir } = req.params

  // cek permintaan turun dan permintaan naik


  var r1_tampung_turun, r1_tampung_naik;

  let produksi_naik = await Produksi.findAll({
    order: [
      ['permintaan', 'DESC']
    ],
  })

  let produksi_turun = await Produksi.findAll({
    order: [
      ['permintaan', 'ASC']
    ],
  })

  let produksi = await Produksi.findAll()

  r1_tampung_turun = produksi_turun[0].permintaan
  r1_tampung_naik = produksi_naik[0].permintaan

  // LOGIC R1 permintaan
  var x = r1_tampung_turun
  var r1_naik = 0, r1_turun = 0;
  var a = r1_tampung_naik - x / r1_tampung_naik - r1_tampung_turun
  if (a >= r1_tampung_naik) {
    r1_naik = 0
  }
  if (x <= r1_tampung_turun) {
    r1_turun = 1
  }
  console.log("naik" + r1_naik + "turun" + r1_turun);
  // LOGIC R1 lanjut
  var r1_hasil_nilai_turun = r1_tampung_naik - produksi[0].permintaan / r1_tampung_naik - r1_tampung_turun
  console.log(r1_hasil_nilai_turun);
  var r1_hasil_nilai_naik = produksi[0].permintaan - r1_tampung_turun / r1_tampung_naik - r1_tampung_turun
  console.log(r1_hasil_nilai_naik);

  // logic R2 
  var nilai_z = r1_tampung_naik + produksi[0].permintaan + r1_hasil_nilai_naik + r1_hasil_nilai_naik
  produksi[0].permintaan + r1_tampung_naik
  var hasil = Math.ceil(nilai_z)
  console.log(hasil)


  // aturan ke 3 sedikt banyak 
  // let produksi_sedikit = await Produksi.findAll({
  //   order: [
  //     ['jumlah_persediaan', 'ASC']
  //   ],
  // })

  // let produksi_banyak = await Produksi.findAll({
  //   order: [
  //     ['jumlah_persediaan', 'DESC']
  //   ],
  // })
  // var r1_tampung_sedikit = produksi_sedikit[0].jumlah_persediaan
  // var r1_tampung_banyak = produksi_banyak[0].jumlah_persediaan

  // var x = r1_tampung_sedikit;



  res.render("admin/fuzzy/view_fuzzy", {
    title: "Fuzzy",
    produksi,
    hasil
  })
}