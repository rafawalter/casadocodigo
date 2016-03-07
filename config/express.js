module.exports = function() {
	var express = require('express');
	var app = express();
	app.set('view engine', 'ejs');
	app.get('/produtos', function(req, res) {
		res.render('produtos/lista');
	});

	return app;
};
