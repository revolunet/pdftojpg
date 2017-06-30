var gm = require("gm")
var express = require("express")

var app = express()

const gmToBuffer = data => new Promise((resolve, reject) => data.stream((err, stdout, stderr) => {
  if (err) {
    return reject(err)
  }
  const chunks = []
  stdout.on("data", chunk => {
    chunks.push(chunk)
  })
  // these are 'once' because they can and do fire multiple times for multiple errors,
  // but this is a promise so you'll have to deal with them one at a time
  stdout.once("end", () => {
    resolve(Buffer.concat(chunks))
  })
  stderr.once("data", data => {
    reject(String(data))
  })
}))

app.post("/convert", (req, res) => {
  console.log("starting PDF->JPG conversion")

  const pageNumber = 1
  const size = 1024

  const data = gm(req, `file.pdf[${pageNumber}]`).setFormat("jpeg").resize(size)

  gmToBuffer(data).then(
    buffer => {
      console.log("finished PDF->JPG conversion")
      res.send(buffer)
    },
    error => {
      console.error("ERROR", error)
      res.status(500).json({
        error: error.message
      })
    }
  )
})

var port = process.env.PORT || 8888

app.listen(port, () => {
  console.log(`listening on http://127.0.0.1:${port}`)
})
