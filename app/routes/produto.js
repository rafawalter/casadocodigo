module.exports = function(app) {
	
	app.get('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		produtoDao.lista( function(err, produtos) {
			res.render('produtos/lista', {lista: produtos});
		});

		connection.end();
	});
};
