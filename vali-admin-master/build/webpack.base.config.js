;
'use strict';
const path = require("path");
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const utils = require('./utils');
const config = require('./config');
module.exports = {
	entry: {
		app: ['babel-polyfill', './src/main.js']
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: "babel-loader",
			include: path.resolve(__dirname, "../src"),
			exclude: /node_modules/,
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			include: path.resolve(__dirname, "../src"),
			exclude: /node_modules/
		}, {
			test: /\.json$/,
			loader: 'json-loader',
			include: path.resolve(__dirname, "../src"),
			exclude: /node_modules/,
			options: {
				name: utils.assetsPath('json/[name].[hash:7].[ext]', config.build.mode)
			}
		}, {
			test: /\.[s]?css$/, //转义css和scss
			use: [
				'vue-style-loader',
				'style-loader',
				'css-loader',
				'sass-loader',
				// 全局scss配置
				{
					loader: 'sass-resources-loader',
					options: {
						resources: [path.resolve(__dirname, '../src/assets/css/global.scss')]
					}
				}
			]
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				esModule: false,
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]', config.build.mode)
			},
			exclude: /node_modules/
		}, {
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				esModule: false,
				limit: 10000,
				name: utils.assetsPath('media/[name].[hash:7].[ext]', config.build.mode)
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'file-loader',
			options: {
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]', config.build.mode)
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.vue', '.less', '.css', '.scss', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, '../src'), //@表示src目录的别名
		}
	},
	node: {
		setImmediate: false,
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	optimization: {
		minimizer: [new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					drop_debugger: true,
					drop_console: true,
					comparisons: false
				},
				output: {
					comments: false,
					ascii_only: true,
				},
				sourceMap: true,
				warnings: false
			}
		}), ],
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 2,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					chunks: 'async',
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		},
		runtimeChunk: {
			name: entrypoint => `runtime-${entrypoint.name}`,
		},
	}
};
