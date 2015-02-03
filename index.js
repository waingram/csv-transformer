var express = require('express'),
    app = express(),
    request = require('request'),
    CSVTransformer = require('./lib/csv-transformer.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('json spaces', 2);

app.get('/', function (req, res) {
  var csv,
      metadata,
      options,
      csvTransformer;

  csv = req.query.uri;
  options = {
    csv: csv
  };

  csvTransformer = new CSVTransformer(options);

  res.setHeader('Content-Type', 'application/json');

  request.get(req.query.uri)
    .pipe(csvTransformer)
    .pipe(res);

});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});
