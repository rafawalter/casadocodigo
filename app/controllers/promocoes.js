module.exports = function(app) {
	var controller = {};

	controller.lista = function(req,res) {
		var connection = app.infra.connectionFactory();
		var promocaoDao = new app.infra.PromocaoDao(connection);
		promocaoDao.lista( function(err, promocao) {
			res.format({
				html: function() {
					res.render('promocoes/lista', {lista: promocao});
				},
				json: function() {
					res.json(promocao);
				},
			});
		});

		connection.end();
	};

	controller.obterFormulario = function(req,res) {
		res.render('promocoes/form', {promocao:{}});
	};

	controller.salva = function(req,res) {
		var promocao = req.body;

		req.assert('descricao', 'informe a descricao').notEmpty();
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
		var promocaoDao = new app.infra.PromocaoDao(connection);
		promocaoDao.salva(promocao, function() {
			res.redirect('/promocoes');
		});
	}

	return controller;
}