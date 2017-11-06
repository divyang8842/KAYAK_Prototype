var ejs = require('ejs');
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 100,
	host : '127.0.0.1',
	user : 'root',
	password : 'root',
	database : 'cmpe273',
	port : 3306,
	debug : false
});

//
//var closeConnection = function(connection) {
//	connection.release();
//};

var fetchData = function(callback, sqlQuery,data) {
	pool.getConnection(function(err, connection) {
		connection.query(sqlQuery,data, function(err, rows) {

			if (err) {
				console.log("ERROR: " + err.message);
			} else {
				callback(err, rows);
			}
			connection.release();
		});
	});
};

var setData = function(callback, sqlQuery,data) {
	pool.getConnection(function(err, connection) {
		connection.query(sqlQuery,data, function(err, rows) {
			try {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				callback(err, rows);

			} finally {
				connection.release();
			}		
		});
	});

};

exports.fetchData = fetchData;
exports.setData = setData;
