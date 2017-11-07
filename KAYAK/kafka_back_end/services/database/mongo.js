var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var url = "mongodb://localhost:27017/dropbox";

var connect = function(callback){

     MongoClient.connect(url, function(err, _db){
         if (err) { throw new Error('Could not connect: '+err); }
         db = _db;
         connected = true;
        // console.log(connected +" is connected?");
         callback(db);
     });
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

            callback(err,data);
        });
    });
};

exports.findDoc = function(collectionname,conditionjson,callback){
    connect(function (db) {
        var coll = db.collection(collectionname);
        var cursor = coll.find(conditionjson);
        var data = [];
        cursor.forEach(function(doc) {
            data.push(doc);
        }, function(err) {
            callback(false,data);
        });
    });
};

exports.insertDoc = function(collectionname,insertdata,callback){
    connect(function (db) {
        var coll = db.collection(collectionname);
        coll.insertOne(insertdata, function(err, data){
            callback(err,data);
        });
    });
};

exports.update = function(collectionname,query,insertdata,callback){
    connect(function (db) {
        var coll = db.collection(collectionname);

        coll.update(query,insertdata, function(err, data){
            callback(err,data);
        });
    });
};
