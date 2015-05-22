'use strict';
var assert = require('assert');
var join = require('path').join;
var readFileSync = require('fs').readFileSync;
var uncommentIt = require('../');

it('should uncomment html', function() {
  var html = readFileSync(join(__dirname, 'fixtures/uncomment-me.html'), 'utf8');
  var actual = uncommentIt(html, 'html');
  var expectedData = readFileSync(join(__dirname, 'expected/uncommented.html'), 'utf8');

  assert.deepEqual(actual, {
    data: expectedData,
    comments: [
      '<!--<script charset="utf-8">-->',
      '<!--  var value = \'test\';-->',
      '<!--       </script> -->',
      '<!--<script charset="utf-8">\n  var value = \'prod\';\n</script>\n\n<script charset="utf-8">\n  var value = \'test and prod\';\n</script>-->'
    ]
  });
});

it('should uncomment js', function() {
  var html = readFileSync(join(__dirname, 'fixtures/uncomment-me.js'), 'utf8');
  var actual = uncommentIt(html, 'js');
  var expectedData = readFileSync(join(__dirname, 'expected/uncommented.js'), 'utf8');

  assert.deepEqual(actual, {
    data: expectedData,
    comments: [
      '// var value = \'prod\';',
      '/*var value = \'test and prod\';*/',
      '/*var value = \'dev\';\nvar another = \'not dav\' */',
      '/*\nvar value = \'test\'\n*/'
    ]
  });
});

it('should uncomment css', function() {
  var html = readFileSync(join(__dirname, 'fixtures/uncomment-me.css'), 'utf8');
  var actual = uncommentIt(html, 'css');
  var expectedData = readFileSync(join(__dirname, 'expected/uncommented.css'), 'utf8');

  assert.deepEqual(actual, {
    data: expectedData,
    comments: [
      '/* body {\n  background: blue;\n}*/',
      '/*body {\n  background: green;\n} */'
    ]
  });
});
