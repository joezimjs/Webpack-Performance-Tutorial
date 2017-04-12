const path = require('path')
const webpack = require('webpack')
const buildConfig = require('./config.js').build
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = 'development')
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'))

let babelOptions = {
	presets: [ 'es2016', 'es2017' ],
	plugins: ['syntax-dynamic-import']
}

// Many modern browsers have really good support for ES2015, so you may not need
// this, but if you support IE and/or older browsers, you'll need this
if (buildConfig.compileTarget === 'es5') {
	babelOptions.plugins.push(['transform-runtime', { helpers: false }])
	babelOptions.presets.push(['es2015', { modules: false }])
}

let config = {
	entry: { main: './src/main.js' },
	output: {
		path: path.resolve(process.cwd(), 'dist'),
		filename: 'app-[name]-[chunkhash:8].js',
		chunkFilename: 'app-[name]-[chunkhash:8].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|vue)$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					configFile: './config/.eslintrc'
				}
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: babelOptions
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					cssModules: {
						localIdentName: '[name]__[local]__[hash:8]',
						camelCase: true
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]-[hash:8].[ext]',
							publicPath: '/images/',
							outputPath: '/images/'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], { root: process.cwd() }),
		new HtmlWebpackPlugin({ template: 'src/index.html' }),
	],
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: 'dist',
		port: 8080,
		historyApiFallback: true
	},
	performance: {
		hints: ENV === 'production' ? 'warning' : false
	},
	stats: {
		cached: false,
		children: false,
		chunkModules: false,
		chunkOrigins: false,
		errorDetails: false,
		modules: false,
		publicPath: false,
		reasons: false,
		source: false,
		timings: false
	}
}

module.exports = config