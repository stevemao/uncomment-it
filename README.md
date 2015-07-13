#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Uncomment html, js or css

**NOTE**: This is using regex and therefore is pretty fragile. Created for simplicity and perf reasons. Read more at https://github.com/sindresorhus/comment-regex/issues/1.

**HINT**: In order to make it work properly, adjusting some space around the comments might help.

## Install

```sh
$ npm install --save uncomment-it
```


## Usage

```js
var uncommentIt = require('uncomment-it');

uncommentIt('<!--<div>a div</div>-->', 'html');
//=> <div>a div</div>

uncommentIt('// var test = \'test\'', 'js');
//=> var test = 'test'

uncommentIt('/*body {background: blue}*/', 'css');
//=> body {background: blue}
```

```sh
$ npm install --global uncomment-it
$ uncomment-it --help

  Usage
    uncomment-it <input-path> <type>
    uncomment-it <input-path> <type> <output-path>
    cat <input-path> | uncomment-it <type>

  Example
    uncomment-it index.html html
    uncomment-it index.js js uncommented.html
    cat index.css | uncomment-its css
    cat index.html | uncomment-it html > uncommented.html

  Options
    -v, --verbose    Verbose output
```


## License

MIT © [Steve Mao](https://github.com/stevemao)


[npm-image]: https://badge.fury.io/js/uncomment-it.svg
[npm-url]: https://npmjs.org/package/uncomment-it
[travis-image]: https://travis-ci.org/stevemao/uncomment-it.svg?branch=master
[travis-url]: https://travis-ci.org/stevemao/uncomment-it
[daviddm-image]: https://david-dm.org/stevemao/uncomment-it.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/stevemao/uncomment-it
