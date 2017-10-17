const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

class Build {

	run(webpackConfig) {
		const config = merge(webpackConfig, {
			plugins: webpackConfig.plugins.concat([
				new UglifyJSPlugin(),
				new webpack.DefinePlugin({ // <-- key to reducing React's size
					'process.env': {
						'NODE_ENV': JSON.stringify('production')
					}
				}),
				new CompressionPlugin({
					asset: "[path].gz[query]",
					algorithm: "gzip",
					test: /\.js$|\.css$|\.html$/,
					threshold: 10240,
					minRatio: 0.8
				})
			])
		});
		webpack(config, (err, stats) => {
			if (err) {
				console.error(err);
			} else {
				console.log('[webpack production log]', stats.toString());
			}
		});
	}
}

module.exports = new Build();