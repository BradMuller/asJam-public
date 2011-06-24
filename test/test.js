var assert = require('assert');
var path = require('path');
var fs = require('fs');

var parser = require('../lib/parse');
var printer = require('../lib/print');

var testDataDir = path.join(__dirname, '..', 'testData');


function testScript(testName, callback) {
    var sourceFilename = path.join(testDataDir, testName + '.as3');
    var expectedFilename = path.join(testDataDir, testName + '.js');

    var source = fs.readFileSync(sourceFilename, 'utf8');
    var expected = fs.readFileSync(expectedFilename, 'utf8');

    var actual;

    try {
        actual = printer.gen_code(parser.parse(source));
    } catch (e) {
        callback(e || new Error('Unknown error'));
        return;
    }

    if (actual.trim() !== expected.trim()) {
        callback('Test ' + testName + ' failed; got:\n' + actual + '\nbut expected:\n' + expected + '\nfor input:\n' + source);
        return;
    }

    callback(null);
}

var testNames = fs.readdirSync(testDataDir).filter(function (testFilename) {
    return /\.js$/.test(testFilename);
}).map(function (testFilename) {
    return testFilename.replace(/\.js$/g, '');
});

var skippedTests = [ ];
var failedTests = [ ];
var passedTests = [ ];

testNames.forEach(function (testName) {
    if (/TODO/.test(testName)) {
        console.warning('Skipping test ' + testName);
        skippedTests.push(testName);
        return;
    }

    console.log('Running test ' + testName + '...');

    testScript(testName, function (err, warn) {
        if (err) {
            console.error(String(err));
            failedTests.push(testName);
            return;
        }

        passedTests.push(testName);
    });
});

console.log();
console.log('All tests completed');
console.log([
    failedTests.length + ' failed',
    passedTests.length + ' passed',
    skippedTests.length + ' skipped',
].join(', '));

if (failedTests.length > 0) {
    process.exit(1);
}