var mysql = require('mysql');

function createConnection() {
	var env = require('../../config/config')();
	return mysql.createConnection(env.banco);					

};

module.exports = function() {
	return createConnection;
};

