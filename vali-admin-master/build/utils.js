'use strict'

const path = require('path');
const config = require('./config');

module.exports = {
	assetsPath(_path,processEnv){
		const assetsSubDirectory = processEnv === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
		return path.posix.join(assetsSubDirectory, _path)
	}
	
	
}
 