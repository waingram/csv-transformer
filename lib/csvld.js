/*
 *
 * https://github.com/waingram/csvld
 *
 * Copyright (c) 2014 Bill Ingram
 * Licensed under the UofI-NCSA license.
 */

'use strict';

var request = require('request');
var Baby = require('babyparse');

exports.parse = function (options, callback) {
  request(options, function (err, res, body) {
    if (err) {
      throw Error(err);
    } else {
      // TODO: write my own parser
      var pcsv = Baby.parse(body);

      var context = {
        "@vocab": options.url + "#",
        "@base": options.url,
        "csv": "http://w3c.github.io/csvw/vocab#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "row": {
          "@id": "csv:row",
          "@type": "xsd:integer"
        }
      };

      var graph = [];
      for (var i = 1; i < pcsv.data.length; i++) {
        var row = {};
        row["csv:row"] = i + 1;
        for (var j = 0; j < pcsv.data[0].length; j++) {
          var key = pcsv.data[0][j];
          var val = pcsv.data[i][j];
          row[key] = val;
        }
        graph.push(row);
      }
      var json = {
        "@context": context,
        "@graph": graph
      };

      callback(json);
    }
  });
};

function parseCsv(csv) {

}
