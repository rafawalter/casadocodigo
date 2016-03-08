var connectionFactory = require('../infra/connectionFactory');
var ProdutoDao = require('../infra/ProdutoDao');

module.exports = function(app) {
	app.get('/produtos', function(req, res) {
		var connection = connectionFactory();
		var produtoDao = new ProdutoDao(connection);
		produtoDao.lista( function(err, produtos) {
			res.render('produtos/lista', {lista: produtos});
		});

		connection.end();
	});
};
