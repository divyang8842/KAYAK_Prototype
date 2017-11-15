var mysql = require('mysql');
var dbType = "mysql";
var pool = require('./connectionPooling');

pool.createpool(100,dbType,function(){});

var fetchData = function(sqlQuery,data,callback) {
	pool.getConnection(function(err, connection) {
		connection.query(sqlQuery,data, function(err, rows) {

			if (err) {
				console.log("ERROR: " + err.message);
			} else {
				callback(err, rows);
			}
            pool.closeConnection(db,dbType);
		});
	},dbType);
};

var setData = function( sqlQuery,data,callback) {
	pool.getConnection(function(err, connection) {
		connection.query(sqlQuery,data, function(err, rows) {
			try {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				callback(err, rows);

			} finally {
                pool.closeConnection(db,dbType);
			}
		});
	},dbType);
};

exports.fetchData = fetchData;
exports.setData = setData;
