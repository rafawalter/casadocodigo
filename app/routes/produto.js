module.exports = function(app) {
	
	app.get('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		produtoDao.lista( function(err, produtos) {
			res.format({
				html: function() {
					res.render('produtos/lista', {lista: produtos});
				},
				json: function() {
					res.json(produtos);
				},
			});
		});

		connection.end();
	});

	app.post('/produtos', function(req, res) {
		var produto = req.body;

		// usar input[name] como string para informar o campo a ser validado
		req.assert('titulo', 'titulo deve ser preenchido').notEmpty();
		req.assert('preco', 'preço deve ser um numero').isFloat();
		var erros = req.validationErrors();
		if (erros) {
			res.format({
				html: function() {
					res.render('produtos/form', {validationErrors: erros, produto:produto});
				},
				json: function() {
					res.status(400).json(erros);
				}
			});
			return;
		};

		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		produtoDao.salva(produto, function() {
			res.redirect('/produtos');
		});

		connection.end();
	});

	app.get('/produtos/form', function(req, res) {
		res.render('produtos/form', {produto:{}});
	});
};
