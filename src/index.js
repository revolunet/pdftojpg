var fs      = require('fs');
var path    = require('path');
var pdf2img = require('pdf2img');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
//var jsonParser = bodyParser.json()

app.use(bodyParser.raw({ limit: '50mb', type: 'application/pdf' }))

app.post('/convert', function(req, res) {


  var pageNumber = 1;
  var input   = __dirname + path.sep + 'localpdf.pdf';
  var outputDir = __dirname + path.sep + 'outputfork';

  fs.writeFileSync(input, req.body);

  pdf2img.setOptions({
    type: 'jpg',
    page: pageNumber,
    size: 980,
    density: 600,
    outputdir: outputDir,
    outputname: 'testoutput'
  });

  var outputPath = outputDir + path.sep + 'testoutput_' + pageNumber + '.jpg'

  pdf2img.convert(input, function(err, info) {
    if (err) console.log(err)
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(fs.readFileSync(outputPath));
  });

})

app.listen('8888', () => {
  console.log('listening on http://127.0.0.1:8888')
})

