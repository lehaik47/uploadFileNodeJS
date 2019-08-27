var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('port', process.env.PORT || 3000);
// app.use(express.logger('dev'));
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.errorHandler());

app.post('/upload/:filename', function (req, res) {
  var filename = path.basename(req.params.filename);
  console.log(filename);
  var directory=path.resolve(__dirname)+'/uploads/'
  filename = path.resolve(directory, filename);
  console.log(path.resolve(directory, filename));
  var dst = fs.createWriteStream(filename);
  //console.log(dst);
  req.pipe(dst);
  dst.on('drain', function() {
    console.log('drain', new Date());
    req.resume();
  });
  req.on('end', function () {
    //res.send(200);
    //return response
    res.send({
        status: true,
        message: 'Files are uploaded',
        data: data
    });
  });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
