var http = require('http');
var ip = 3000;

var server = http.createServer()
	.listen(ip, function() {
		console.log('servidor iniciado');		
	});