;
'use strict';
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const baseConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('./config'); module.exports = merge(baseConfig, {
	mode: config.build.mode,
	output: {
		filename: "[name].[hash:7].js",
		path: config.build.assetsRoot,
		publicPath: config.build.assetsPublicPath,
		chunkFilename: utils.assetsPath('js/chunk-[name].[hash].js', config.build.mode)
	},
	plugins: [new webpack.DefinePlugin({
			'processEnv': config.build.mode
		}), new CleanWebpackPlugin(), new HtmlWebpackPlugin({
			filename: 'index.html',
			template: config.build.index,
			inject: true,
			chunksSortMode: 'auto',
			favicon: config.favicon
		}), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.HashedModuleIdsPlugin(), new webpack
		.NoEmitOnErrorsPlugin(), new ExtractTextPlugin(utils.assetsPath('css/[hash:7].css'), config.build
			.mode), new VueLoaderPlugin()
	],
});
