module.exports = function(app) {
	
	app.get('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		produtoDao.lista( function(err, produtos) {
			res.render('produtos/lista', {lista: produtos});
		});

		connection.end();
	});

	app.post('/produtos', function(req, res) {
		var produto = req.body;
		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		produtoDao.salva(produto, function() {
			res.redirect('/produtos');
		});
	});

	app.get('/produtos/form', function(req, res) {
		res.render('produtos/form', {produto:{}});
	});
};
