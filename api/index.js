const { app, initPromise } = require("../dist/index.cjs");

// Add debug route BEFORE initPromise
app.get("/__debug", (req, res) => {
  const path = require("path");
  const fs = require("fs");
  
  const cwd = process.cwd();
  const dirname = __dirname;
  const distPublic1 = path.resolve(cwd, "dist/public");
  const distPublic2 = path.resolve(dirname, "../dist/public");
  const distPublic3 = path.resolve(dirname, "public");

  res.json({
    cwd,
    dirname,
    env: process.env.NODE_ENV,
    vercel: process.env.VERCEL,
    paths: {
      "cwd/dist/public": { path: distPublic1, exists: fs.existsSync(distPublic1) },
      "dirname/../dist/public": { path: distPublic2, exists: fs.existsSync(distPublic2) },
      "dirname/public": { path: distPublic3, exists: fs.existsSync(distPublic3) },
    },
    // What files are actually available?
    dirnameLs: fs.readdirSync(dirname).slice(0, 20),
    cwdLs: fs.readdirSync(cwd).slice(0, 20),
  });
});

module.exports = async (req, res) => {
  await initPromise;
  app(req, res);
};
