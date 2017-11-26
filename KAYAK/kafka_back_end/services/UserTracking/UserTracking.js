var security = require('../utils/security');
var mysql=require('./../database/mysql');
var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
//var errorHandler = require('./../utils/errorLogging');

// mongo DB Inclusion
var ObjectID = require('mongodb').ObjectID;

function handle_request(msg, callback){

    var response =[];
    var push_query;
    // response.code = "200";
    // console.log("Success--- inside flight booking"+response);
    // callback(null, response);

    mongo.connect(mongoURL, function() {

     console.log('Connected to mongo at: ' + mongoURL);
     var coll = mongo.collection('UserTracking');

    if(msg.current_page ==="FLIGHT_PAGE")
    {

        coll.update({}, {
                $push: {
                    FLIGHT_PAGE: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:Date()

                    }}}
            , function (err, user) {
                console.log("inside call back" + user);
                if (user) {
                    response.code = "200";
                    console.log("Success--- inside Tracking User- FLIGHT_PAGE"+response);
                    callback(null, response);

                }
                else {
                    response.code = "400";
                    console.log("Fail"+response);
                    callback(null, response);
                }
            });
    }



    });

}

exports.handle_request = handle_request;