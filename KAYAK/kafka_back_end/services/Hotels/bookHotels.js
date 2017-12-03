var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
var ObjectID = require('mongodb').ObjectID;


function handle_booking(msg, callback){

    console.log("In Book hotels handle Booking:"+ JSON.stringify(msg));

    var dataArry = [];
    var hotelid = msg.hotelitem.hotel_id;
    var checkin = msg.checkin;
    var checkout = msg.checkout;
    var roomtype = msg.roomtype.toString();
    var roomcount = msg.roomcount;
    var fetchQuery = "";
    var res={};

    console.log("roomcount:"+roomcount);
    console.log("roomcount:"+hotelid);
    switch(roomtype){
        case "0":{
            fetchQuery="UPDATE hotel_availability SET king_rooms = king_rooms-? WHERE hotel_id=? AND date>=? AND date<=?";
            break;
        }
        case "1":{
            fetchQuery="UPDATE hotel_availability SET queen_rooms = queen_rooms-? WHERE hotel_id=? AND date>=? AND date<=?";
            break;
        }
        case "2":{
            fetchQuery="UPDATE hotel_availability SET standard_rooms = standard_rooms-? WHERE hotel_id=? AND date>=? AND date<=?";
            break;
        }
        default:{
            console.log("invalid roomtype!")
            res.code = 400;
            break;
        }
    }
    dataArry.push(roomcount);
    dataArry.push(hotelid);
    dataArry.push(checkin);
    dataArry.push(checkout);
    

    console.log("DATA: "+dataArry);
    console.log("QUERY: "+fetchQuery);

    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        if(err){
            console.log(err);
            res.code = 400;
            callback(null, res);
        }
        else{


            mongo.connect(mongoURL, function() {

                console.log('Connected to mongo at: ' + mongoURL);
                console.log("msg.hotelItem"+msg.hotelitem);
                console.log("msg.hotelItem.hotel_city"+msg.hotelitem.hotel_city);
                console.log("msg.hotelItem.userid"+msg.userid);
                var coll = mongo.collection('Billing');

                coll.findOne({"userid" : msg.userid},function (err, searchuser) {
                    if(searchuser)
                    {

                        var hotel_total_new = searchuser.hotel_total+msg.room_rent;
                        var number_of_hotel_bookings = searchuser.hotel.length ;
                        number_of_hotel_bookings = number_of_hotel_bookings +1;
                        console.log("inside user find");
                        coll.update({userid:msg.userid}, {
                            $push: {
                                hotel: {
                                    billid:new ObjectID(),
                                    checkin:msg.checkin,
                                    checkout:msg.checkout,
                                    hotelcity:msg.hotelitem.hotel_city,
                                    hotel_id:msg.hotelitem.hotel_id,
                                    hotel_name:msg.hotelitem.hotel_name,
                                    hotel_state:msg.hotelitem.hotel_state,
                                    roomtype:msg.roomtype,
                                    roomcount:msg.roomcount,
                                    room_rent:msg.room_rent,
                                    city:msg.city
                                }
                            }
                        }, function (err, user) {

                            if(user){
                                coll.update({"userid" : msg.userid},{ $set:{hotel_total:hotel_total_new,
                                                                            hotel_count:number_of_hotel_bookings}},
                                    function (err, user2) {
                                    if(!err)
                                    {
                                        // console.log('Hotel Booked');


                                        var new_total;
                                        var new_counter;
                                        coll = mongo.collection('hotel_analytics');

                                        coll.findOne({name: msg.hotelitem.hotel_name,
                                                year:new Date().getFullYear()},
                                            function(err, user) {

                                                console.log("user" + JSON.stringify(user));
                                                if(user && user.name)
                                                {
                                                    new_total = user.revenue+msg.room_rent;
                                                    new_counter = user.count+1;

                                                    console.log("Inside Hotel Analytics - Update part - 1");

                                                    coll.update({name: msg.hotelitem.hotel_name,
                                                            year:new Date().getFullYear()
                                                        }, {
                                                            $set: {
                                                                revenue: new_total,
                                                                count: new_counter
                                                            }
                                                        },
                                                        function (err, user2) {
                                                            if(!err)
                                                            {
                                                                // City wise update

                                                                var new_total_city;
                                                                var new_counter_city;
                                                                coll = mongo.collection('city_analytics');

                                                                console.log("Inside Hotel Analytics - Update part - 1 -- city analytics");
                                                                coll.findOne({name: msg.hotelitem.hotel_city,
                                                                                year:new Date().getFullYear()},
                                                                    function(err, user){
                                                                        if(user && user.name)
                                                                        {
                                                                            new_total_city = user.revenue+msg.room_rent;
                                                                            new_counter_city = user.count+1;

                                                                            console.log("Inside City Analytics - update / Hotel Update part");

                                                                            coll.update({name: msg.hotelitem.hotel_city,
                                                                                    year:new Date().getFullYear()
                                                                                }, {
                                                                                    $set: {
                                                                                        revenue: new_total_city,
                                                                                        count: new_counter_city
                                                                                    }
                                                                                },
                                                                                function (err, user2) {

                                                                                    if(!err)
                                                                                    {
                                                                                        res.code = 200;
                                                                                        res.value = results;
                                                                                        callback(null, res);

                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        console.log(err);
                                                                                        res.code = 400;
                                                                                        callback(null, res);
                                                                                    }

                                                                                });
                                                                        }
                                                                        else
                                                                        {
                                                                            coll.insert({name: msg.hotelitem.hotel_city,
                                                                                    year:new Date().getFullYear(),
                                                                                    revenue: msg.room_rent,
                                                                                    count: 1
                                                                                }
                                                                                ,
                                                                                function (err, user2) {
                                                                                    if(!err)
                                                                                    {
                                                                                        res.code = 200;
                                                                                        res.value = results;
                                                                                        callback(null, res);

                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        console.log(err);
                                                                                        res.code = 400;
                                                                                        callback(null, res);
                                                                                    }

                                                                                })
                                                                        }

                                                                    })

                                                            }
                                                            else
                                                            {
                                                                console.log(err);
                                                                res.code = 400;
                                                                callback(null, res);

                                                            }

                                                        });

                                                }
                                                else
                                                {
                                                    console.log("Inside Hotel Analytics - Insert part -1 ");
                                                    coll.insert({name: msg.hotelitem.hotel_name,
                                                            year:new Date().getFullYear(),
                                                            revenue: msg.room_rent,
                                                            count: 1
                                                        }
                                                        ,
                                                        function (err, user2) {

                                                            if(!err)
                                                            {
                                                                var new_total_city;
                                                                var new_counter_city;
                                                                coll = mongo.collection('city_analytics');

                                                                // response.code = "200";
                                                                // console.log("Success" + response);
                                                                // callback(null, response);

                                                                coll.findOne({name: msg.hotelitem.hotel_city,
                                                                        year:new Date().getFullYear()},
                                                                    function(err, user){
                                                                        if(user && user.name)
                                                                        {
                                                                            new_total_city = user.revenue+msg.room_rent;
                                                                            new_counter_city = user.count+1;

                                                                            console.log("Inside City Analytics - update / Car Update part");

                                                                            coll.update({name: msg.hotelitem.hotel_city,
                                                                                    year:new Date().getFullYear()
                                                                                }, {
                                                                                    $set: {
                                                                                        revenue: new_total_city,
                                                                                        count: new_counter_city
                                                                                    }
                                                                                },
                                                                                function (err, user2) {

                                                                                    if(!err)
                                                                                    {
                                                                                        res.code = 200;
                                                                                        res.value = results;
                                                                                        callback(null, res);

                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        console.log(err);
                                                                                        res.code = 400;
                                                                                        callback(null, res);
                                                                                    }

                                                                                });
                                                                        }
                                                                        else
                                                                        {
                                                                            coll.insert({name: msg.hotelitem.hotel_city,
                                                                                    year:new Date().getFullYear(),
                                                                                    revenue: msg.room_rent,
                                                                                    count: 1
                                                                                }
                                                                                ,
                                                                                function (err, user2) {
                                                                                    if(!err)
                                                                                    {
                                                                                        res.code = 200;
                                                                                        res.value = results;
                                                                                        callback(null, res);

                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        console.log(err);
                                                                                        res.code = 400;
                                                                                        callback(null, res);
                                                                                    }

                                                                                })
                                                                        }

                                                                    })

                                                            }
                                                            else
                                                            {
                                                                console.log(err);
                                                                res.code = 400;
                                                                callback(null, res);

                                                            }

                                                        });

                                                }
                                            })
                                    }
                                    else
                                    {
                                        console.log(err);
                                        res.code = 400;
                                        callback(null, res);

                                    }

                                    });
                            }
                            else
                            {
                                console.log(err);
                                res.code = 400;
                                callback(null, res);
                            }
                        });
                    }});

            });
        }
        //callback(null, res);
    });
}

var setHotelReviews = function(msg,callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="INSERT INTO hotel_reviews (hotel_id,review_overall,review_count,review_location,review_vibe,review_service,review_amenities,review_room,review_food) values(?,?,?,?,?,?,?,?,?)";
    var dataArry =  [];

    dataArry.push(msg.hotelid);
    dataArry.push(msg.reviewoverall);
    dataArry.push(msg.reviewcount);
    dataArry.push(msg.reviewlocation);
    dataArry.push(msg.reviewvibe);
    dataArry.push(msg.reviewservice);
    dataArry.push(msg.reviewameneties);
    dataArry.push(msg.reviewroom);
    dataArry.push(msg.reviewfood);

    console.log("DATA: "+dataArry);

    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("HotelReview","HotelReview",err);
            // callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Successfully Hotel Review Inserted");
        }
        callback(null, res);

    });

};

var checkHotelReviews = function(msg,callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="Select * from hotel_reviews where hotel_id=(?)";
    var dataArry =  [];

    dataArry.push(msg.hotelid);

    console.log("DATA: "+dataArry);

    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("HotelReview","HotelReview",err);
            // callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log(results);
        }
        callback(null, res);

    });

};

exports.handle_booking = handle_booking;
exports.setHotelReviews=setHotelReviews;
exports.checkHotelReviews=checkHotelReviews;