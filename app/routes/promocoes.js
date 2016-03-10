module.exports = function(app) {
	var controller = app.controllers.promocoes;

	app.get('/promocoes', controller.lista);
	app.get('/promocoes/form', controller.obterFormulario);
	app.post('/promocoes', controller.salva);

};
