function ProdutoDao(connection) {
	this._connection = connection;
};

ProdutoDao.prototype.lista = function() {
	var that = this;

	return new Promise(function(resolve,reject) {
		that._connection.query('SELECT * FROM livros', function(err,produtos) {
			if (err) {
				reject(err);
			} else {
				resolve(produtos);
			};
		});
	});
};

ProdutoDao.prototype.buscaPorId = function(id, callback) {
	this._connection.query('SELECT * FROM livros WHERE id = ?', [id], function(erro, retorno){
		callback(erro, retorno[0]);
	});
};

ProdutoDao.prototype.atualiza = function (produto, callback) {
	this._connection.query('UPDATE livros SET ? WHERE id=?', [produto,produto.id], function(erro){
		callback(erro);
	});
};

ProdutoDao.prototype.salva = function(produto) {
	that = this;
	return new Promise(function(resolve,reject) {
		that._connection.query('INSERT INTO livros SET ?', produto, function(err) {
			if (err) {
				reject('Não foi possível salvar o produto');
			}
			resolve();
		});
	});
};

module.exports = function() {
	return ProdutoDao;
};