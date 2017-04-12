let fs = require('fs')
let path = require('path')
let compile = require('./jest-preprocessor.js').process

let filepath = path.resolve(__dirname, `../src/lame.vue`)
let contents = fs.readFileSync(filepath, {encoding:'utf8'})

console.log(compile(contents, filepath))