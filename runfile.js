const { run } = require('runjs');

const tasks = {
	build () {
		run('webpack')
	},

	start () {
		// Reset Changes to database
		run('del-cli src/database.json')
		run('cp src/database.backup.json src/database.json')

		// Start webpack and development server
		run('webpack-dev-server', {async: true})

		// Start REST API server
		run('json-server src/database.json -p 3000', {async: true})
	}
}

module.exports = tasks