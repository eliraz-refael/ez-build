const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');

const port = process.env.PORT || 3000;

class DevServer {

	run(webpackConfig) {
		const config = merge(webpackConfig, {
			plugins: webpackConfig.plugins.concat([new webpack.HotModuleReplacementPlugin()]),
			devtool: 'source-map'
		});
		const server = new WebpackDevServer(webpack(config), {
			stats: {
				colors: true
			},
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			historyApiFallback: true,
			hot: true,
			disableHostCheck: true
			// quiet: true
		});
		server.listen(port, '0.0.0.0', (...args) => {
			console.log(`Listening at localhost:${port}`);
		});
	}

}

module.exports = new DevServer();