#!/usr/bin/env node
'use strict';
var chalk = require('chalk');
var concat = require('concat-stream');
var fs = require('fs');
var meow = require('meow');
var uncommentIt = require('./');

var cli = meow({
  help: [
    'Usage',
    '  uncomment-it <input-path> <type>',
    '  uncomment-it <input-path> <type> <output-path>',
    '  cat <input-path> | uncomment-it <type>',
    '',
    'Example',
    '  uncomment-it index.html html',
    '  uncomment-it index.js js uncommented.html',
    '  cat index.css | uncomment-its css',
    '  cat index.html | uncomment-it html > uncommented.html',
    '',
    'Options',
    '  -v, --verbose    Verbose output'
  ].join('\n')
}, {
  alias: {
    v: 'verbose'
  }
});

var input = cli.input;
var inputPath = input[0];
var type = input[1];
var outputPath = input[2];
var verbose = cli.flags.verbose;

function extraInfo(comments) {
  if (!verbose) {
    return;
  }

  console.log('');

  var uncommentedCount = comments.length;

  if (uncommentedCount > 0) {
    comments.forEach(function(comment) {
      console.log(chalk.green(comment) + chalk.cyan('uncommented'));
    });

    console.log(chalk.green('✔ ') + uncommentedCount + ' comments uncommented.');
  }
}

if (process.stdin.isTTY) {
  if (!inputPath) {
    console.error('Expected an input path');
    process.exit(1);
  }

  fs.readFile(inputPath, function(err, data) {
    if (err) {
      console.error(err.toString());
      process.exit(1);
    }

    var result = uncommentIt(data, type);

    if (outputPath) {
      fs.writeFile(outputPath, result.data, function(err) {
        if (err) {
          console.error(err.toString());
          process.exit(1);
        }
      });
    } else {
      process.stdout.write(result.data);
    }

    extraInfo(result.comments);
  });
} else {
  type = inputPath;

  process.stdin
    .pipe(concat(function(data) {
      var result = uncommentIt(data, type);
      process.stdout.write(result.data);
      extraInfo(result.comments);
    }));
}
