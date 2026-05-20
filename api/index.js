const { app, initPromise } = require("../dist/index.cjs");

app.get("/__debug", (req, res) => {
  const path = require("path");
  const fs = require("fs");
  
  const distPublic = path.resolve(process.cwd(), "dist/public");
  const indexHtml = path.resolve(distPublic, "index.html");

  let distPublicLs = [];
  let indexHtmlExists = false;
  let indexHtmlSize = null;
  let indexHtmlPreview = null;

  try {
    distPublicLs = fs.readdirSync(distPublic);
  } catch(e) {
    distPublicLs = [`ERROR: ${e.message}`];
  }

  try {
    indexHtmlExists = fs.existsSync(indexHtml);
    if (indexHtmlExists) {
      const stat = fs.statSync(indexHtml);
      indexHtmlSize = stat.size;
      indexHtmlPreview = fs.readFileSync(indexHtml, "utf8").slice(0, 200);
    }
  } catch(e) {
    indexHtmlPreview = `ERROR: ${e.message}`;
  }

  const layers = app._router?.stack?.map(l => ({
    name: l.name,
    regexp: l.regexp?.toString().slice(0, 60),
  })) ?? [];

  res.json({
    distPublic,
    distPublicLs,
    indexHtml,
    indexHtmlExists,
    indexHtmlSize,
    indexHtmlPreview,
    middlewareLayers: layers,
  });
});

module.exports = async (req, res) => {
  await initPromise;
  app(req, res);
};
