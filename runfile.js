const { run } = require('runjs');

const tasks = {
	test () {
		run('jest --watch --coverage --no-cache --config ./config/jest.json')
	},

	build () {
		run('webpack --config ./config/webpack.config.js')
	},

	start () {
		// Reset Changes to database
		run('del-cli src/database.json')
		run('cp src/database.backup.json src/database.json')

		// Start webpack and development server
		run('webpack-dev-server --config config/webpack.config.js', {async: true})

		// Start REST API server
		run('json-server src/database.json -p 3000', {async: true})
	},

	coverage () {
		run('http-server ./coverage/lcov-report -p 8090 -o', {async: true})
	}
}

module.exports = tasks