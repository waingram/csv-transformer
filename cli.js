#! /usr/bin/env node

'use strict';

var CSVTransformer = require('./lib/csv-transformer.js'),
    request = require('request');

var userArgs,
    uri,
    options,
    csvTransformer;
    
userArgs = process.argv;
uri = userArgs[2];

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1 || uri === undefined) {
  return console.log('cli help');
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
  return console.log(require('./package').version);
}

options = {
  csv: uri
};

csvTransformer = new CSVTransformer(options);

request.get(csv)
  .pipe(csvTransformer)
  .pipe(console.stdout);