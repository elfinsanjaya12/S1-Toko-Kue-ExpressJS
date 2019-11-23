"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync("rahasia", 10);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "fidin",
          password: password,
          role: "admin",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "elfin",
          password: password,
          role: "pimpinan",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "ega",
          password: password,
          role: "siswa",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
