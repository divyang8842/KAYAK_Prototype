var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var url = "mongodb://localhost:27017/kayak_18";
var pool = require('./connectionPooling');
var dbType = pool.TYPE_MONGO;

pool.createpool(100,dbType,function(){});

var connect = function(callback){
    pool.getConnection(callback,dbType);
};

var collection = function(name){
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};


exports.findOneDoc = function(collectionname,conditionjson,callback){
    connect(function (db) {
        var coll = db.collection(collectionname);
        coll.findOne(conditionjson, function(err, data){
            pool.closeConnection(db,dbType);
            callback(err,data);
        });
    });
};

exports.findDoc = function(collectionname,conditionjson,callback){
    connect(function (db) {
        var coll = db.collection(collectionname);
        var cursor = coll.find(conditionjson);
        //pool.closeConnection(db,dbType);
        var data = [];
        cursor.forEach(function(doc) {
            data.push(doc);
        }, function(err) {
            pool.closeConnection(db,dbType);
            callback(false,data);
        });
    });
};

exports.insertDoc = function(collectionname,insertdata,callback){

    return;
    connect(function (db) {
        var coll = db.collection(collectionname);
        coll.insertOne(insertdata, function(err, data){
            pool.closeConnection(db,dbType);
            callback(err,data);
        });
    });
};

exports.update = function(collectionname,query,insertdata,callback){
    connect(function (db) {
        var coll = db.collection(collectionname);

        coll.update(query,insertdata, function(err, data){
            pool.closeConnection(db,dbType);
            callback(err,data);
        });
    });
};
