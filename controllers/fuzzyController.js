const { Produksi } = require('../models')
const Op = require("sequelize").Op

exports.viewFuzzy = async (req, res) => {
  const produksi = await Produksi.findAll()
  res.render("admin/fuzzy/view_fuzzy", {
    title: "Fuzzy",
    produksi
  })
}