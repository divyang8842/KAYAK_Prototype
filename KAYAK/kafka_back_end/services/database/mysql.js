var mysql = require('mysql');
var dbType = "mysql";
var pool = require('./connectionPooling');

pool.createpool(100,dbType,function(){});

var fetchData = function(sqlQuery,data,callback) {
	pool.getConnection(function(err, connection) {
		connection.query(sqlQuery,data, function(err, rows) {
			try {
                if (err) {
                    console.log("ERROR: " + err.message);
                } else {
                    callback(err, rows);
                }
            } finally {
                pool.closeConnection(connection,dbType);
            }
        });
	},dbType);
};

var setData = function( sqlQuery,data,callback,addInsertedId) {
	pool.getConnection(function(err, connection) {
		connection.query(sqlQuery,data, function(err, rows) {
			try {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				if(addInsertedId){
                    var id = rows.insertId;
                    callback(err, rows,id);
				}else{
                    callback(err, rows);
				}
			} finally {
                pool.closeConnection(connection,dbType);
			}
		});
	},dbType);
};

exports.fetchData = fetchData;
exports.setData = setData;
