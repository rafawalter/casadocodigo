module.exports = function(app) {
	var controller = {};

	controller.lista = function(req,res) {
		res.json([{name:'Destiny'},{name:'Battlefront'},{name:'Infinity'}]);
	};

	return controller;
};