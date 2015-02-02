#! /usr/bin/env node

'use strict';

var csvld = require('./lib/csvld.js');

var userArgs = process.argv;
var uri = userArgs[2];

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1 || uri === undefined) {
  return console.log('cli help');
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
  return console.log(require('./package').version);
}

var options = {
  method: 'GET',
  url: uri
};

csvld.parse(options, function (json) {
  console.log(json);
});
