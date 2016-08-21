#!/usr/bin/env node
var babelrc = require('../config/loadBabelrc')()
require('babel-register')(babelrc)
require('babel-polyfill')
require('./cli')
