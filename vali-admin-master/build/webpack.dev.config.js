;
'use strict';
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const baseConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('./config'); module.exports = merge(baseConfig, {
	mode: config.dev.mode,
	output: {
		filename: "[name].[hash:7].js",
		path: config.build.assetsRoot,
		publicPath: config.dev.assetsPublicPath,
		chunkFilename: utils.assetsPath('js/chunk-[name].[hash].js', config.dev.mode)
	},
	plugins: [new HtmlWebpackPlugin({
			filename: 'index.html',
			template: config.dev.index,
			inject: true,
			favicon: config.favicon
		}), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(), new webpack.HashedModuleIdsPlugin(), new VueLoaderPlugin()
	],
	devServer: config.dev.server
});
