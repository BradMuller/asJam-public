var assert = require('assert');
var path = require('path');
var fs = require('fs');

var convert = require('../lib/convert');

var rootPath = path.join(__dirname, '..', 'testData', 'proj');
var outputs = convert.project(rootPath);

Object.keys(outputs).forEach(function (outputPath) {
    var expectedFilename = path.join(rootPath, outputPath);

    var expected = fs.readFileSync(expectedFilename, 'utf8');
    var actual = printer.gen_code(outputs[outputPath]);

    if (actual.trim() !== expected.trim()) {
        assert.ok(false, 'Test for ' + outputPath + ' failed; got:\n' + actual + '\nbut expected:\n' + expected + '\n');
    }
});
