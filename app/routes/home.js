module.exports = function(app) {
	var controller = app.controllers.produto;

	app.get('/', controller.lista);
};