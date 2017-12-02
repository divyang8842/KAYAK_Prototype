var security = require('../utils/security');
var mysql=require('./../database/mysql');
var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
//var errorHandler = require('./../utils/errorLogging');

// mongo DB Inclusion
var ObjectID = require('mongodb').ObjectID;

function getHotelBookings(msg, callback){

    mongo.connect(mongoURL, function() {

        console.log('Connected to mongo at: ' + mongoURL);
        var res = {};
        var user_type=msg.user_type;
        console.log("ZZZ"+user_type);

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('Billing');
        coll.find({ hotel : { $exists : true } }).toArray(function (err, user) {

            if (!err) {
                console.log("LOL"+JSON.stringify(user));
                if(user_type==1) {
                    var list = [];
                    for (var i = 0; i < user.length; i++) {
                        list.push(user[i].hotel);
                    }
                    res.code = "200";
                    res.bookinglist = list;
                }
                else
                {
                    res.code = "200";
                    res.bookinglist = user;
                }

            }
            else
            {
                console.log("Failed");
            }
            callback(null, res);


        });


    });



}

function getFlightBookings(msg, callback){

    mongo.connect(mongoURL, function() {

        console.log('Connected to mongo at: ' + mongoURL);
        var res = {};
        var user_type=msg.user_type;
        console.log("ZZZ"+user_type);
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('Billing');
        coll.find({ flight : { $exists : true } }).toArray(function (err, user) {

            if (!err) {
                console.log(user);
                if(user_type==1) {
                    var list = [];
                    for (var i = 0; i < user.length; i++) {
                        list.push(user[i].flight);
                    }

                    res.code = "200";
                    res.bookinglist = list;
                }
                else
                {
                    res.code = "200";
                    res.bookinglist = user;
                }

            }
            else
            {
                console.log("Failed");
            }
            callback(null, res);


        });


    });

}
function getCarBookings(msg, callback){

    mongo.connect(mongoURL, function() {

        console.log('Connected to mongo at: ' + mongoURL);
        var res = {};

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('Billing');
        coll.find({ car : { $exists : true } }).toArray(function (err, user) {

            if (!err) {
                console.log(user);
                var list=[];
                for(var i=0;i<user.length;i++)
                {
                   list.push(user[i].car);
                }
                res.code = "200";
                res.bookinglist = list;

            }
            else
            {
                console.log("Failed");
            }
            callback(null, res);


        });


    });



}



exports.getHotelBookings=getHotelBookings;
exports.getFlightBookings=getFlightBookings;
exports.getCarBookings=getCarBookings;
