# EZ-Build Builds made easier and reusable
I've made this project so I can reuse my build across my projects, I thought it might help some other people so feel free to contribute your own configuration.

## How to use it?
- first run `npm install -D ez-build` or `yarn add -D ez-build`
I wrote a build configuration using webpack + jss + typescript + tslint and created a folder named `ts-jss-tslint` and inside there are 3 files:
    - build.js
    - build-production.js
    - dev-server.js
    - get-config.js
- Create a `dev-server.js` file with the following content
```
const devServer = require('ez-build/ts-jss-tslint/dev-server.js');
const WebpackConfig = require('ez-build/ts-jss-tslint/get-config.js');

const webpackConfig = new WebpackConfig({
	appDir: 'app', // the app root dir (defaults to 'app')
	buildDir: 'build', // the app build dir (defaults to 'build')
	testDir: 'test', // the app test dir (defaults to 'test')
	title: 'The html file title' // the html file's title (defaults to '')
});

devServer.run(webpackConfig.getWebpackConfig());
```

- create a `build.js` file with the following content:
```
const build = require('ez-build/ts-jss-tslint/build.js');
const WebpackConfig = require('ez-build/ts-jss-tslint/get-config.js');

const webpackConfig = new WebpackConfig({
	appDir: 'app', // the app root dir (defaults to 'app')
	buildDir: 'build', // the app build dir (defaults to 'build')
	testDir: 'test', // the app test dir (defaults to 'test')
	title: 'Mini sites editor' // the html file's title (defaults to '')
});

build.run(webpackConfig.getWebpackConfig());
```
- create a `build-productions.js` with the following content:

```
const build = require('ez-build/ts-jss-tslint/build-production.js');
const WebpackConfig = require('ez-build/ts-jss-tslint/get-config.js');

const webpackConfig = new WebpackConfig({
	appDir: 'app', // the app root dir (defaults to 'app')
	buildDir: 'build', // the app build dir (defaults to 'build')
	testDir: 'test', // the app test dir (defaults to 'test')
	title: 'Mini sites editor' // the html file's title (defaults to '')
});

build.run(webpackConfig.getWebpackConfig());
```
- on your `package.json` file add the following scripts:

```
"scripts": {
    "build": "node ./build.js",
    "build:production": "node ./build-production.js",
    "start": "node ./dev-server.js"
  }
```

#### Feel free to add your configuration, Try to keep the same structure for the sake of easy switch between configurations. Thanks!