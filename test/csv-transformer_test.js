/*global describe,it*/
'use strict';

var assert = require('assert'),
    request = require('request'),
    CSVTransformer = require('../lib/csv-transformer.js');


describe('Simple mapping', function () {
  it('Test001: The simplest possible table without metadata', function (done) {
    var csv = 'http://w3c.github.io/csvw/tests/test001.csv',
        actual = '',
        expected = { url: 'http://w3c.github.io/csvw/tests/test001.csv',
          distribution: { downloadURL: 'http://w3c.github.io/csvw/tests/test001.csv' },
          row:
              [ { Surname: 'Homer', FamilyName: 'Simpson' },
                { Surname: 'Marge', FamilyName: 'Simpson' },
                { Surname: 'Bart', FamilyName: 'Simpson' },
                { Surname: 'Lisa', FamilyName: 'Simpson' },
                { Surname: 'Maggie', FamilyName: 'Simpson' },
                { Surname: 'Ned', FamilyName: 'Flanders' },
                { Surname: 'Krusty', FamilyName: 'the Clown' },
                { Surname: 'Waylon', FamilyName: 'Smithers' } ] },
        options = {csv: csv},
        csvTransformer = new CSVTransformer(options);

    request.get(csv).pipe(csvTransformer);

    csvTransformer.on('data', function (chunk) {
      actual += chunk;
    });

    csvTransformer.on('finish', function () {
      actual = JSON.parse(actual);
      assert.deepEqual(actual, expected);
      done();
    });

  });

  it('Test002: Table with one quoted field without metadata', function (done) {
    var csv = 'http://w3c.github.io/csvw/tests/test002.csv',
        actual = '',
        expected = { url: 'http://w3c.github.io/csvw/tests/test002.csv',
          distribution: { downloadURL: 'http://w3c.github.io/csvw/tests/test002.csv' },
          row:
              [ { Surname: 'Homer', FamilyName: 'Simpson' },
                { Surname: 'Marge', FamilyName: 'Simpson' },
                { Surname: 'Bart', FamilyName: 'Simpson' },
                { Surname: 'Lisa', FamilyName: 'Simpson' },
                { Surname: 'Maggie', FamilyName: 'Simpson' },
                { Surname: 'Ned', FamilyName: 'Flanders' },
                { Surname: 'Krusty', FamilyName: 'the Clown' },
                { Surname: 'Waylon', FamilyName: 'Smithers' } ] },
        options = {csv: csv},
        csvTransformer = new CSVTransformer(options);

    request.get(csv).pipe(csvTransformer);

    csvTransformer.on('data', function (chunk) {
      actual += chunk;
    });

    csvTransformer.on('finish', function () {
      actual = JSON.parse(actual);
      assert.deepEqual(actual, expected);
      done();
    });

  });

  it('Test003: Table with whitespace before and after every field without metadata', function (done) {
    var csv = 'http://w3c.github.io/csvw/tests/test003.csv',
        actual = '',
        expected = { url: 'http://w3c.github.io/csvw/tests/test003.csv',
          distribution: { downloadURL: 'http://w3c.github.io/csvw/tests/test003.csv' },
          row:
              [ { Surname: ' Homer ', FamilyName: ' Simpson ' },
                { Surname: ' Marge ', FamilyName: ' Simpson ' },
                { Surname: ' Bart ', FamilyName: ' Simpson ' },
                { Surname: ' Lisa ', FamilyName: ' Simpson ' },
                { Surname: ' Maggie ', FamilyName: ' Simpson ' },
                { Surname: ' Ned ', FamilyName: ' Flanders ' },
                { Surname: ' Krusty ', FamilyName: ' the Clown ' },
                { Surname: ' Waylon ', FamilyName: ' Smithers ' } ] },
        options = {csv: csv},
        csvTransformer = new CSVTransformer(options);

    request.get(csv).pipe(csvTransformer);

    csvTransformer.on('data', function (chunk) {
      actual += chunk;
    });

    csvTransformer.on('finish', function () {
      actual = JSON.parse(actual);
      assert.deepEqual(actual, expected);
      done();
    });

  });

  it('Test005: A table with entity identifiers and references to other entities without metadata', function (done) {
    var csv = 'http://w3c.github.io/csvw/tests/test005.csv',
        actual = '',
        expected = { url: 'http://w3c.github.io/csvw/tests/test005.csv',
          distribution: { downloadURL: 'http://w3c.github.io/csvw/tests/test005.csv' },
          row:
              [ {"id": "1", "Surname": "Homer", "FamilyName": "Simpson", "child_id": "3"},
                {"id": "1", "Surname": "Homer", "FamilyName": "Simpson", "child_id": "4"},
                {"id": "1", "Surname": "Homer", "FamilyName": "Simpson", "child_id": "5"},
                {"id": "2", "Surname": "Marge", "FamilyName": "Simpson", "child_id": "3"},
                {"id": "2", "Surname": "Marge", "FamilyName": "Simpson", "child_id": "4"},
                {"id": "2", "Surname": "Marge", "FamilyName": "Simpson", "child_id": "5"},
                {"id": "3", "Surname": "Bart", "FamilyName": "Simpson", "child_id": null},
                {"id": "4", "Surname": "Lisa", "FamilyName": "Simpson", "child_id": null},
                {"id": "5", "Surname": "Maggie", "FamilyName": "Simpson", "child_id": null},
                {"id": "6", "Surname": "Ned", "FamilyName": "Flanders", "child_id": null},
                {"id": "7", "Surname": "Krusty", "FamilyName": "the Clown", "child_id": null},
                {"id": "8", "Surname": "Waylon", "FamilyName": "Smithers", "child_id": null} ] },
        options = {csv: csv, null: null},
        csvTransformer = new CSVTransformer(options);

    request.get(csv).pipe(csvTransformer);

    csvTransformer.on('data', function (chunk) {
      actual += chunk;
    });

    csvTransformer.on('finish', function () {
      actual = JSON.parse(actual);
      console.log(actual);
      assert.deepEqual(actual, expected);
      done();
    });

  });
});
