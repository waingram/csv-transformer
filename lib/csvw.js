/*
 *
 * https://github.com/waingram/csvld
 *
 * Copyright (c) 2014 Bill Ingram
 * Licensed under the UofI-NCSA license.
 */

'use strict';

var util = require('util');
var Transform = require('stream').Transform;

module.exports = (function() {

  // private
  var isHeader,     // first line?
      isQuoted,     // quoted?
      previous,     // previous char
      isNewline,    // lineTerminator detected
      cell,         // current cell
      header,       // header row
      row;          // current row

  function CSVW(options) {

    Transform.call(this, options);

    this.delimiter = options.delimiter || ',';
    this.lineTerminator = options.lineTerminator || '\n';
    this.quoteChar = options.quoteChar || '\"';
    this.nullValue = options.hasOwnProperty('null') ? options.null : '';

    isHeader = true;
    isQuoted = false;
    isNewline = false;

    cell = '';
    header = [];
    row = [];

    // TODO: ugly hack!
    var startJson = '{"url": "' + options.uri;
    startJson += '", "distribution": {"downloadURL": "' + options.uri;
    startJson += '"}, "row": [';

    this.push(startJson);
  }

  util.inherits(CSVW, Transform);

  // @override
  CSVW.prototype._transform = function (chunk, encoding, done) {
    chunk = chunk.toString();
    try {
      this._parseLine(chunk);
      done();
    } catch (err) {
      done(err);
    }
  };

  // @override
  CSVW.prototype._flush = function(next) {
    this.push(']}');
    next();
  };


  // private
  CSVW.prototype._parseLine = function (line) {

    var cur,
	i = 0;
    
    for (; i < line.length; i++) {
      cur = line.charAt(i);
      
      // new line detected!
      if (isNewline) {
	// crlf
	if (cur === this.lineTerminator[1]) {
          continue;
	}
	this.push(', ');
	isNewline = false;
      }

      /*
       * If double-quotes are used to enclose fields, then a double-quote 
       * appearing inside a field must be escaped by preceding it with another 
       * double quote.
       */
      if (previous === this.quoteChar) {
	if (cur === this.quoteChar) {
	  cell += this.quoteChar;
	  previous = '';
	  continue;
	} else {
	  isQuoted = isQuoted ? false : true;
	}
      }

      // process quoteChar and loop
      if (cur === this.quoteChar) {
	previous = cur;
	continue;
      }

      // delimiter
      if (!this.isQuoted && cur === this.delimiter) {
	if (cell === '') cell = this.nullValue;
	row.push(cell);
	cell = '';
	previous = '';
	continue;
      }

      // lineTerminator
      if (!this.isQuoted &&
	  (cur === this.lineTerminator ||
	   cur === this.lineTerminator[0])) {
	isNewline = true;
	row.push(cell);
	this._emitLine();
	cell = '';
	previous = '';
	continue;
      }

      // otherwise, it's a regular char
      previous = cur;
      cell += cur;
      
    }

  };

  CSVW.prototype._emitLine = function () {
    var result = '{',
	i = 0;
    if (isHeader) {
      header = row;
      isHeader = false;
    } else {
      if (header.length > 0) {
	for (; i < row.length; i++) {
	  result += '"' + header[i] + '": "' + row[i] + '",';
	}
	result = result.slice(0, -1);
	result += '}';
	this.push(result);
      } else {
	for (; i < row.length; i++) {
	  result += '"' + row[i] + '",';
	}
	result = result.slice(0, -1);
	result += '}';
	this.push(result);
      }
    }
    row = [];
    previous = '';
  };
  
  return CSVW;
  
})();
