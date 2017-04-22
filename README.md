# jsty
> Fast and tiny CSS in JS library

[![npm](https://img.shields.io/npm/v/jsty.svg)](https://www.npmjs.com/package/jsty)
[![Build Status](https://travis-ci.org/jas-chen/jsty.svg)](https://travis-ci.org/jas-chen/jsty)
[![Coverage Status](https://coveralls.io/repos/github/jas-chen/jsty/badge.svg?branch=master)](https://coveralls.io/github/jas-chen/jsty?branch=master)
![gzip size](http://img.badgesize.io/https://unpkg.com/jsty@0.8.0/dist/jsty.min.js?compression=gzip&label=gzip%20size)
![Dependencies](https://david-dm.org/jas-chen/jsty.svg)

## Features
- No dependency, super tiny (~2.5 KB gzipped)
- Framework agnostic
- Universal rendering
- No custom AST transform or module loader needed
- Code completion via TypeScript declaration files
- Atomic style CSS
- Inserts only critical styles into stylesheet (both server side and client side)
- No JavaScript object parsing
- No JavaScript object hashing
- _Adaptive_ CSS prefixer that detects browser CSS support and then prefixs styles lazily and properly. It prefixes not only CSS properties and values but also CSS pseudo-classes or pseudo-elements such as `:fullscreen`, `::placeholder`
- Class names and prefix results are cached
- Flexibility. Don't need the prefixer? You can remove it or replace it with your own choice

## Installation
```
yarn add jsty
```

## [Get Started](https://github.com/jas-chen/jsty/tree/master/doc)

## Browser Support
IE >= 9
> Built-in prefixer will not prefix old flexbox syntax.


## Inspirations
- [Styletron](https://github.com/rtsao/styletron)
- [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer/)
- [TypeStyle](https://github.com/typestyle/typestyle)
- [styled-components](https://github.com/styled-components/styled-components)
