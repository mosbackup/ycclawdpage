const { app, initPromise } = require("../dist/index.cjs");

module.exports = async (req, res) => {
  await initPromise;

  // Debug after init
  if (req.url === "/__debug") {
    const path = require("path");
    const fs = require("fs");

    const distPublic = path.resolve(process.cwd(), "dist/public");
    const indexHtml = path.resolve(distPublic, "index.html");

    const layers = app._router?.stack?.map(l => ({
      name: l.name,
      regexp: l.regexp?.toString().slice(0, 60),
    })) ?? [];

    return res.json({
      distPublic,
      indexHtmlExists: fs.existsSync(indexHtml),
      middlewareLayers: layers,
    });
  }

  app(req, res);
};
