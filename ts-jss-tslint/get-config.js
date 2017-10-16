'use strict';

const webpack = require('webpack');
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const PACKAGE = require(`${process.cwd()}/package.json`);
const { CheckerPlugin } = require('awesome-typescript-loader')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = class WebpackConfig {

	constructor({ appDir = 'dir', buildDir = 'build', testDir = 'test', title = '' }) {
		this.appDir = appDir;
		this.buildDir = buildDir;
		this.testDir = testDir;
		this.title = title;
		this.rootPath = process.cwd();
		this.isDev = process.env.NODE_ENV !== 'production';
		this.banner = `${PACKAGE.name} - ${PACKAGE.version}`;
		this.paths = {
			app: path.join(this.rootPath, this.appDir),
			build: path.join(this.rootPath, this.buildDir),
			test: path.join(this.rootPath, this.testDir)
		}
		this.setEntry();
		this.setExtensions();
	}

	getPlugins() {
		return [
			new HtmlWebpackPlugin({
				title: this.title,
				template: `${this.paths.app}/index.html`,
			}),
			new CheckerPlugin(),
			new webpack.BannerPlugin(this.banner),
			new webpack.DefinePlugin({
				VERSION: JSON.stringify(PACKAGE.version),
				__DEV__: this.isDEV
			}),
			new webpack.LoaderOptionsPlugin({
				test: [/\.tsx?$/],
				exclude: [/node_modules/],
				options: {
					tslint: {
						failOnWarning: false,
						failOnError: !this.isDEV,
						failOnHint: true,
					}
				}
			})
			// new FriendlyErrorsWebpackPlugin()
		]
	}

	setEntry({ outputName = 'bundle', source = './index.tsx' }) {
		this.entry = {
			[outputName]: source
		}
	}

	setExtensions(ext = ['.ts', '.tsx', '.js', '.jsx']) {
		this.extensions = ext;
	}

	getRules() {
		return [
			{
				enforce: 'pre',
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader'
			},
			{
				enforce: 'pre',
				test: /\.tsx?$/,
				loader: 'tslint-loader',
				exclude: /node_modules/,
			},
			{ enforce: "pre", test: /\.tsx?$/, loader: "source-map-loader" },
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
				loader: 'file-loader'
			}
		];
	}

	getOutput() {
		return {
			path: this.paths.build,
			filename: '[name].js',
			publicPath: '/'
		}
	}

	getWebpackConfig() {
		return {
			context: this.paths.app,
			resolve: {
				extensions: this.extensions
			},
			entry: this.entry,
			output: this.output,
			plugins: this.getPlugins(),
			module: {
				rules: this.getRules()
			}
		}
	}
}