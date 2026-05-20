// api/index.js
const { app, initPromise } = require("../dist/index.cjs");

module.exports = async (req, res) => {
  await initPromise;
  app(req, res);
};
