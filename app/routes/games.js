module.exports = function(app) {
	var controller = app.controllers.games;

	app.get('/games', controller.lista);
}