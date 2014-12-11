/*global describe,it*/
'use strict';

var 
  assert = require('assert'),
  csvld  = require('../lib/csvld.js'),
  csvUrl = 'https://raw.githubusercontent.com/iherman/CSVPlus/gh-pages/tests/tree-ops/tree-ops.csv';

describe('csvld node module', function() {
  it('must parse four (4) rows', function() {
    var options = {
      method: 'GET',
      url: csvUrl
    };
    csvld.parse(options, function (json) {
      console.log(json);
      assert(json.length === 4);
    });
  });
});

