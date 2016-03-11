var mysql = require('mysql');

function createConnection() {
	if (process.env.NODE_ENV) {
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'casadocodigo_test',
		});					
	} else {
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'casadocodigo',
		});			
	};
};

module.exports = function() {
	return createConnection;
};

