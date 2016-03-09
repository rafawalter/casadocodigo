module.exports = function() {
	var express = require('express');
	var bodyParser = require('body-parser');
	var load = require('express-load');
	var app = express();

	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	app.use(express.static('./public'));

	app.use(bodyParser());

	load('infra', {cwd:'app'})
		.then('routes')
		.into(app);

	return app;
};
