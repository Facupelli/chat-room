const express = require("express");
const { ENV_VARIABLE } = process.env;
const { conn } = require("./src/db.js");
const server = require("./src/app.js");



const PORT = 3001 || process.env.PORT;


conn.sync({ force: Boolean(Number(ENV_VARIABLE)) }).then(() => {
  server.listen(PORT, async () => {
    try {
      var flat = Boolean(Number(ENV_VARIABLE));
      if (!flat) {
        console.log(`Force ${flat}, datos no cargados`);
      }
      console.log(`--------listening on port ${PORT}---------`); // eslint-disable-line no-console
    } catch (e) {
      console.log(e);
    }
  });
});
