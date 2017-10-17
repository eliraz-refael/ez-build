const webpack = require('webpack');

class Build {

	run(webpackConfig) {
		webpack(webpackConfig, (err, stats) => {
			if (err) {
				console.error(err);
			} else {
				console.log('[webpack log]', stats.toString());
			}
		});
	}
}

module.exports = new Build();