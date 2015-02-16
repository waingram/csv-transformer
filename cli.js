#! /usr/bin/env node

'use strict';

var request = require('request'),
    CSVTransformer = require('./lib/csv-transformer.js');

var userArgs = process.argv,
    csv = userArgs[2],
    options = {csv: csv, null: null},
    csvTransformer = new CSVTransformer(options);


if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1 || csv === undefined) {
  return console.log('cli help');
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
  return console.log(require('./package').version);
}

request.get(csv)
    .pipe(csvTransformer)
    .pipe(process.stdout);