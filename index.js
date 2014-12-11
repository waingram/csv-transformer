var express = require('express');
var app = express();
var csvld = require('./lib/csvld.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('json spaces', 2);

app.get('/', function(req, res){
  var options = {
    method: 'GET',
    url: req.query.uri
  };
  csvld.parse(options, function (json) {
    // res.set('Content-Type', 'application/json');
    // res.send(json);
    res.json(json);
  });
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});