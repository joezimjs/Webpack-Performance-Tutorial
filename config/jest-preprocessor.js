const fs = require('fs')
const path = require('path')
const babelOptions = require('../package.json').babel

function babel(src) {
	let babelc = require('babel-core')
	return babelc.transform(src, babelOptions).code
}

// this is heavily based on vueify (Copyright (c) 2014-2016 Evan You)
function vue(src, filePath) {
	function toFunction (code) {
		const transpile = require('vue-template-es2015-compiler')
		return transpile('function render () {' + code + '}')
	}
	const vueCompiler = require('vue-template-compiler')
	const parts = vueCompiler.parseComponent(src, { pad: false })

	let script = ''
	if (!parts.script.lang) {
		script = babel(parts.script.content)
	} else {
		throw filePath + ': unknown <script lang="' + parts.script.lang + '">'
	}

	let html = ''
	if (!parts.template.lang || parts.template.lang === 'html') {
		html = parts.template.content
	} else if (parts.template.lang === 'pug') {
		html = require('pug').compile(parts.template.content)()
	} else {
		throw filePath + ': unknown <template lang="' + parts.template.lang + '">'
	}
	// mostly copy & paste from vueify
	const compiled = vueCompiler.compile(html)
	const template = {
		render: toFunction(compiled.render),
		staticRenderFns: '[' + compiled.staticRenderFns.map(toFunction).join(',') + ']'
	}
	return `;(function(){
	${script}
})()

module.exports = module.exports.default
module.exports.render = ${template.render}
module.exports.staticRenderFns = ${template.staticRenderFns}`
}

module.exports = {
	process(src, filePath) {
		let output = src
		if (filePath.endsWith('.vue')) {
			output = vue(src, filePath)
		} else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
			output = babel(src, filePath)
		}
		return output
	},
}