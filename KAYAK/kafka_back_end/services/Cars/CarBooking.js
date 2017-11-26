var security = require('../utils/security');
var mysql=require('./../database/mysql');

var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
var ObjectID = require('mongodb').ObjectID;

//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    var response =[];
    var fetchQuery = "UPDATE car_availibility SET available = 0 WHERE car_id = ? AND dates >=? AND dates <= ? ";
    var dataArry = [];

    dataArry.push(msg.car_id);
    dataArry.push(msg.start_date);
    dataArry.push(msg.end_date);

    console.log("msg.car_id:"+msg.car_id);
    console.log("msg.start_date:"+msg.start_date);
    console.log("msg.end_date:"+msg.end_date);

    mysql.fetchData(fetchQuery,dataArry,function (err,results){

        if(!err){

            mongo.connect(mongoURL, function() {

                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('Billing');

                coll.update({userid:'jay'}, {
                    $push: {
                        car: {
                            billid:new ObjectID(),
                            car_id:msg.car_id,
                            car_model:msg.car_model,
                            car_type:msg.car_type ,
                            car_class:msg.car_class,
                            car_city:msg.car_city,
                            start_date:msg.start_date,
                            end_date:msg.end_date,
                            car_rent:msg.car_rent
                        }
                    }
                }, function (err, user) {
                    console.log("inside call back" + user)
                    if (user) {
                        response.code = "200";
                        console.log("Success--- inside Car booking"+response);
                        callback(null, response);

                    }
                    else {
                        response.code = "400";
                        console.log("Fail"+response);
                        callback(null, response);
                    }
                });
            });

        }
        else
        {
            response.code = "200";
            console.log("Success--- but no result"+response);
            callback(null, response);
        }


    });



}



exports.handle_request = handle_request;