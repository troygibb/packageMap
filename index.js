const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const requestHandler = require('./server/requestHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const TARGET = process.env.npm_lifecycle_event;

process.env.PWD = process.cwd();

if (TARGET === 'devStart') {
	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
	  hot: true,
	  filename: 'build.js',
	  stats: {
	    colors: true,
	  },
	  historyApiFallback: true,
	}));
	app.use(webpackHotMiddleware(compiler, {
	  log: console.log,
	  path: '/__webpack_hmr',
	  heartbeat: 10 * 1000,
	}));
}

const port = process.env.PORT || 3000;

console.log('************environment is ', process.env.PWD);

app.use(express.static(path.join(process.env.PWD, 'build')));

requestHandler(app);

app.listen(port, () => console.log(`Listening on the magical port http://localhost:${port}`));
