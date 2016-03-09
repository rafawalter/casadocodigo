module.exports = function() {
	var express = require('express');
	var bodyParser = require('body-parser');
	var load = require('consign');
	var app = express();
	var validator = require('express-validator');


	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(express.static('./public'));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(validator());

	load({cwd:'app'})
		.include('infra')
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};
