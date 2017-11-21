var mysql = require('mysql');
var pool = require('./connectionPooling');
var dbType = pool.TYPE_MYSQL;
var jsesc = require('jsesc');

//var dataKeys = [];
var timeForValidCache = 60*4;

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});
pool.createpool(100,dbType,function(){});

var fetchData = function(sqlQuery,data,callback,notFromCache) {
    if(!notFromCache){
        notFromCache = false;
    }
    client.exists(sqlQuery+'_'+data, function(err, reply) {
        if (reply === 1 && !notFromCache) {
            console.log('taken from redis');

            client.get(sqlQuery+'_'+data, function(err, reply) {
                console.log("rows is : "+reply);
                callback(err, reply);
            });

        } else {
            console.log('taken from DB');
            pool.getConnection(function(err, connection) {
                connection.query(sqlQuery,data, function(err, rows) {
                    try {
                        if (err) {
                            console.log("ERROR: " + err.message);
                            callback(err, []);
                        } else {

                            client.set( ''+(sqlQuery+'_'+data), ''+rows, function(err1, done) {
                                console.log("rows is : "+rows);
                                client.expire(sqlQuery+'_'+data, timeForValidCache);
                                //dataKeys.push({key:sqlQuery+'_'+data, time:new Date().getTime()});
                                callback(err, rows);

                            });

                        }

                    } finally {
                        pool.closeConnection(connection,dbType);
                    }
                });
            },dbType);
        }
    });

};

var setData = function( sqlQuery,data,callback,addInsertedId,doEscape) {
	pool.getConnection(function(err, connection) {

	    if(doEscape!=undefined && doEscape==true){
	        var length =  data.length;
	        while(length>0){
	            data[--length] = jsesc(data[length]);
             }
        }
		connection.query(sqlQuery,data, function(err, rows) {
			try {
				if (err) {
					console.log("ERROR: " + err.message);
                    callback(err, rows,0);
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


