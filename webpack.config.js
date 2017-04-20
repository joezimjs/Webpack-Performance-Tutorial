const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = 'development')
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'))

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
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
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
	devServer: {
		contentBase: 'dist',
		port: 8080,
		historyApiFallback: true
	}
}

module.exports = config