var express = require('express'),
    app = express(),
    request = require('request'),
    CSVW = require('./lib/csvw.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('json spaces', 2);



app.get('/', function (req, res) {
  var parserOptions = { uri: req.query.uri };
  
  var parser = new CSVW(parserOptions);

  res.setHeader('Content-Type', 'application/json');
  
  request.get(req.query.uri)
    .pipe(parser)
    .pipe(res);
  
  // csvld.parse(options, function (json) {
  //   // res.set('Content-Type', 'application/json');
  //   // res.send(json);
  //   res.json(json);
  // });

});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});
