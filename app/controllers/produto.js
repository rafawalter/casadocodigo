module.exports = function(app) {
	var wrap = require('co-express');
	var controller = {};

	controller.lista = function(req,res) {
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
	};

	controller.obterPorId = function(req,res) {
		var id = req.params.id;

		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);

		produtoDao.buscaPorId(id, function(err, produto) {
			res.render('produtos/form', {produto:produto});
		});

		connection.end();
	};

	controller.atualiza = function(req,res) {
		console.log('chamei put');
		var produto = req.body;

		if (validaFormulario(produto, req, res)) {
			var connection = app.infra.connectionFactory();
			var produtoDao = new app.infra.ProdutoDao(connection);
			produtoDao.atualiza(produto, function() {
				res.redirect('/produtos');
			});

			connection.end();
		};
	};

	controller.salva = wrap(function *(req,res) {
		var produto = req.body;

		if (validaFormulario(produto, req, res)) {
			var connection = app.infra.connectionFactory();
			var produtoDao = new app.infra.ProdutoDao(connection);

			try {
				yield produtoDao.salva(produto);
				res.redirect('/produtos');
			} catch(err) {
				console.log(err);
			}

			connection.end();
		};
	});

	controller.obterFormulario = function(req,res) {
		res.render('produtos/form', {produto:{}});
	};

	function validaFormulario(produto, req, res) {
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
			return false;
		};

		return true;
	};

	return controller;
};