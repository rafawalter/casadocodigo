var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app) {
	app.get('/produtos', function(req, res) {
		var connection = connectionFactory();

		connection.query('SELECT * FROM livros', function(erro, produtos) {
			res.render('produtos/lista', {lista: produtos});
		});

		connection.end();
	});
};
