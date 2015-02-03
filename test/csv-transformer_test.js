/*global describe,it*/
'use strict';

var 
  assert = require('assert'),
  csvw  = require('../lib/csv-transformer.js'),
  csvUrl = 'https://raw.githubusercontent.com/iherman/CSVPlus/gh-pages/tests/tree-ops/tree-ops.csv';

describe('csvw node module', function() {
  it('must parse four (4) rows', function() {
    var options = {
      csv: csvUrl
    };
    csvw.parse(options, function (json) {
      console.log(json);
      assert(json.length === 4);
    });
  });
});

