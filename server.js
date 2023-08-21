const { createServer } = require("http");
const {parse} = require("url");
const next = require("next");
const _ = require("lodash");

const dev = process.env.NODE_ENV !== "production";
const port = Number(process.env.PORT || 3000);

const app = next({dev, hostname: '0.0.0.0', port});
const handle = app.getRequestHandler();

app.prepare()
  .then(async () => {
    // MySQL, Redis?

    createServer(async (req, res) => {
      try {
        await handle(req, res, parse(req.url, true))
      } catch (err) {
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    })
      .once('error', err => {
        console.error(err)
        process.exit(1)
      })
      .listen(port, () => {
        console.log(`> Ready on http://127.0.0.1:${port}`);
      })
  })
