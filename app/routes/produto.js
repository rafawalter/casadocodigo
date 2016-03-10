module.exports = function(app) {
	var controller = app.controllers.produto;

	app.get('/produtos', controller.lista);

	app.get('/produtos/form', controller.obterFormulario);

	app.post('/produtos', controller.salva);

	app.get('/produtos/form/:id', controller.obterPorId);

	app.put('/produtos', controller.atualiza);
};
