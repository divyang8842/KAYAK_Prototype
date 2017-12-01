var security = require('../utils/security');
var mysql=require('./../database/mysql');
var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
//var errorHandler = require('./../utils/errorLogging');

// mongo DB Inclusion
var ObjectID = require('mongodb').ObjectID;

function handle_Request(msg, callback) {

    var response =[];
    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('usertrackingcharts');

        coll.findOne({"userid": msg.userid}, function (err, searchuser) {
            if (searchuser) {
                response.code = "200";
                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                callback(null, response);
            }}
            );
    });


}

exports.handle_Request = handle_Request;