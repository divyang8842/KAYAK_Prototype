var security = require('../utils/security');
var mysql=require('./../database/mysql');
var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
//var errorHandler = require('./../utils/errorLogging');

// mongo DB Inclusion
var ObjectID = require('mongodb').ObjectID;

function getHotelBookings(msg, callback){

    mongo.connect(mongoURL, function() {
        var res = {};
        var user_type=msg.user_type;
        var query = {};
        if(user_type!=1){
            query = {'userid':msg.userid};
        }

        var coll = mongo.collection('Billing');
        coll.distinct("hotel",query,function (err, user) {
            if (!err) {
                res.code = "200";
                res.bookinglist = user;
            }
            else
            {
                console.log("Failed");
            }
            callback(null, res);
        });

})
};

function getFlightBookings(msg, callback){

    mongo.connect(mongoURL, function() {

        var res = {};
        var user_type=msg.user_type;
        var coll = mongo.collection('Billing');

        var query = {};
        if(user_type!=1){
            query = {'userid':msg.userid};
        }
        coll.distinct("flight",query,function (err, user) {
            if (!err) {
                    res.code = "200";
                    res.bookinglist = user;
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
        var res = {};
        var query = {};
        var user_type=msg.user_type;
        if(user_type!=1){
            query = {'userid':msg.userid};
        }
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('Billing');
        coll.distinct("car",query,function (err, user) {
            if (!err) {
                res.code = "200";
                res.bookinglist = user;
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