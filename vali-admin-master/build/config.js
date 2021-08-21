;
'use strict'
const path = require('path');
const formatProxy = (arr = [], apiPath) => {      
	const proxys = {};
	arr.forEach( path => proxys[`/${path}/*`] = { 
		target: apiPath,				 
		changeOrigin: true,				 
		secure: false,	
	})
	
	return proxys;
}
module.exports = {
	favicon: path.resolve(__dirname, '../public/img/favicon.png'),
	build: {
		mode: 'production',
		index: path.resolve(__dirname, '../public/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: './',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		mode: 'development',
		index: path.resolve(__dirname, '../public/index.html'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		cssSourceMap: false,
		server: {
			host: 'localhost',
			hot: true,
			port: 61,
			contentBase: path.resolve(__dirname, "../dist/index.html"),
			compress: true,
			historyApiFallback: true,
			https: false,
			open: false,
			proxy:{
				'/':{ 
					target: '',				 
					changeOrigin: true,				 
					secure: false,	
				}
			},
			proxy: {
				...formatProxy(['api'],'http://106.12.96.246:7022'),
			}
		}
	}
};
