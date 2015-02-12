'use strict';

var request = require('request'),
    csvTransformer = require('../lib/csv-transformer.js');

var csv = 'http://example.com/test.csv',
    metadata = 'http://example.com/metadata.json',
    csvTransformer = new csvTransformer({
      csv: csv,
      metadata: metadata
    });

request.get(csv)
  .pipe(csvTransformer)
  .pipe(console.stdout);
