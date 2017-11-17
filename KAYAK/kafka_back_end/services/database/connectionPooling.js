var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dropbox";
var mysql=require('mysql');


var free_mongo_pool = [];
var free_mysql_pool = [];
var startedConnects = false;
var error = false;

var TYPE_MONGO = "mongo";
var TYPE_MYSQL = "mysql";

var TYPE_DB = TYPE_MONGO;


    var createConnection = function ( callback) {
        if (TYPE_DB == TYPE_MONGO) {
            MongoClient.connect(url, function (err, _db) {
                if (err) {
                    throw new Error('Could not connect: ' + err);
                }
                callback(err, _db);
            });
        } else {
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'kayak_18',
                port: 3306
            });
            callback(null, connection);
        }
    };


    var createpool = function (poolingcount, dbType, callback) {

        console.log("Creating pool for "+dbType);
        TYPE_DB = dbType;
        createConnection(function (err, _db) {
            startedConnects = true;
            if (err) {
                throw new Error('Could not connect: ' + err);
                callback(err, null);
            } else {
                if (TYPE_DB == TYPE_MONGO) {
                    free_mongo_pool.push(_db);
                }else{
                    free_mysql_pool.push(_db);
                }
                createConnectionPool(poolingcount, function (err, result) {
                    console.log("free_mongo_pool is "+free_mongo_pool.length);
                    console.log("free_mysql_pool is "+free_mysql_pool.length);
                    callback(true);
                });
            }
        });
    };



    var createConnectionPool = function (count, callback) {
        for (var i = 0; i < count - 1; i++) {
            createConnection(function (err, _db) {
                if (err) {
                    throw new Error('Could not connect: ' + err);
                    callback(err, null);
                } else {

                    if (TYPE_DB == TYPE_MONGO) {
                        free_mongo_pool.push(_db);
                    }else{
                        free_mysql_pool.push(_db);
                    }
                }
            });
        }
        callback(false, true);
    };



    var getConnection = function (callback,dbType) {
        TYPE_DB = dbType;
        if (startedConnects) {
            if (error) {
                callback(undefined);
            } else {



                if (TYPE_DB == TYPE_MONGO) {
                    console.log("get connection for mongo");
                    getMongoConnection(callback);
                }else{
                    console.log("get connection for mysql");
                    getMySqlConnection(callback);
                }
            }
        } else {
            createpool(1000, function () {
                getConnection(callback,dbType);
            });
        }
    };




    var getMongoConnection =  function(callback){
        while (free_mongo_pool.length <= 0) ;
        var db = free_mongo_pool[0];
        free_mongo_pool = free_mongo_pool.slice(1, free_mongo_pool.length);
        callback(null,db);
    };



    var getMySqlConnection =  function(callback){
        while (free_mysql_pool.length <= 0) ;
        var db = free_mysql_pool[0];
        free_mysql_pool = free_mysql_pool.slice(1, free_mysql_pool.length);
        callback(null,db);
    };



    var closeConnection = function (db,dbType) {
        TYPE_DB = dbType;
        if (TYPE_DB == TYPE_MONGO) {
            free_mongo_pool.push(db);
        }else{
            free_mysql_pool.push(db);
        }
        //console.log("after getting connection back, the count is ",free_pool.length);
    };


exports.getConnection = getConnection;
exports.createpool = createpool;
exports.closeConnection = closeConnection;