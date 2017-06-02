var gm = require("gm")
var express = require("express")

var app = express()

app.post("/convert", function(req, res) {
  console.log("starting PDF->JPG conversion")
  gm(req).toBuffer("jpeg", function(err, buffer) {
    if (err) {
      console.error('ERROR', err);
      res.status(500).json({
        error: err.message
      });
      return;
    }
    console.log("finished PDF->JPG conversion")
    res.send(buffer)
  })
})

var port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`listening on http://127.0.0.1:${port}`)
})
