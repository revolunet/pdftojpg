var gm = require("gm")
var express = require("express")

var app = express()

app.post("/convert", function(req, res) {
  console.log("starting PDF->JPG conversion")
  gm(req).toBuffer("JPG", function(err, buffer) {
    if (!err) {
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

app.listen('8888', () => {
  console.log('listening on http://127.0.0.1:8888')
})

