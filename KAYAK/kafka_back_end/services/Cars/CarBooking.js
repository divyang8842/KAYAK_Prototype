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

                coll.findOne({"userid" : msg.userid},function (err, searchuser) {
                    if(searchuser)
                    {
                        var car_total_new = searchuser.car_total+msg.car_rent;
                        var number_of_car_bookings = searchuser.car.length ;
                        number_of_car_bookings = number_of_car_bookings +1;

                        coll.update({userid:msg.userid}, {
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

                            if(user){

                            coll.update({"userid" : msg.userid},{ $set:{car_total:car_total_new,
                                    car_count:number_of_car_bookings}},
                                function (err, user2) {

                                if(user2)
                                {
                                    var new_total;
                                    var new_counter;
                                    coll = mongo.collection('car_analytics');

                                    coll.findOne({name: msg.car_agency,
                                                  year:new Date().getFullYear()},
                                                function(err, user) {

                                                    console.log("user" + JSON.stringify(user));
                                                    if(user && user.name)
                                                    {
                                                        new_total = user.revenue+msg.car_rent;
                                                        new_counter = user.count+1;

                                                        console.log("Inside Car Analytics - Update part");

                                                        coll.update({name: msg.car_agency,
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

                                                                // response.code = "200";
                                                                // console.log("Success" + response);
                                                                // callback(null, response);

                                                                coll.findOne({name: msg.car_city,
                                                                        year:new Date().getFullYear()},
                                                                    function(err, user){
                                                                        if(user && user.name)
                                                                        {
                                                                            new_total_city = user.revenue+msg.car_rent;
                                                                            new_counter_city = user.count+1;

                                                                            console.log("Inside City Analytics - update / Car Update part");

                                                                            coll.update({name: msg.car_city,
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
                                                                                        response.code = "200";
                                                                                        console.log("Success" + response);
                                                                                        callback(null, response);

                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        response.code = "400";
                                                                                        console.log("Fail" + response);
                                                                                        callback(null, response);
                                                                                    }

                                                                                });
                                                                        }
                                                                        else
                                                                        {
                                                                            coll.insert({name: msg.car_city,
                                                                                    year:new Date().getFullYear(),
                                                                                    revenue: msg.car_rent,
                                                                                    count: 1
                                                                                }
                                                                                ,
                                                                                function (err, user2) {
                                                                                    if(!err)
                                                                                    {
                                                                                        response.code = "200";
                                                                                        console.log("Success" + response);
                                                                                        callback(null, response);

                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        response.code = "400";
                                                                                        console.log("Fail" + response);
                                                                                        callback(null, response);
                                                                                    }

                                                                                })
                                                                        }

                                                                    })

                                                            }
                                                            else
                                                            {
                                                                response.code = "400";
                                                                console.log("Fail"+response);
                                                                callback(null, response);

                                                            }

                                                            });

                                                    }
                                                    else
                                                    {
                                                        console.log("Inside Car Analytics - Insert part");
                                                        coll.insert({name: msg.car_agency,
                                                                year:new Date().getFullYear(),
                                                                revenue: msg.car_rent,
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

                                                                    coll.findOne({name: msg.car_city,
                                                                            year:new Date().getFullYear()},
                                                                        function(err, user){
                                                                            if(user && user.name)
                                                                            {
                                                                                new_total_city = user.revenue+msg.car_rent;
                                                                                new_counter_city = user.count+1;

                                                                                console.log("Inside City Analytics - update / Car Update part");

                                                                                coll.update({name: msg.car_city,
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
                                                                                            response.code = "200";
                                                                                            console.log("Success" + response);
                                                                                            callback(null, response);

                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            response.code = "400";
                                                                                            console.log("Fail" + response);
                                                                                            callback(null, response);
                                                                                        }

                                                                                    });
                                                                            }
                                                                            else
                                                                            {
                                                                                coll.insert({name: msg.car_city,
                                                                                        year:new Date().getFullYear(),
                                                                                        revenue: msg.car_rent,
                                                                                        count: 1
                                                                                    }
                                                                                    ,
                                                                                    function (err, user2) {
                                                                                        if(!err)
                                                                                        {
                                                                                            response.code = "200";
                                                                                            console.log("Success" + response);
                                                                                            callback(null, response);

                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            response.code = "400";
                                                                                            console.log("Fail" + response);
                                                                                            callback(null, response);
                                                                                        }

                                                                                    })
                                                                            }

                                                                        })

                                                                }
                                                                else
                                                                {
                                                                    response.code = "400";
                                                                    console.log("Fail"+response);
                                                                    callback(null, response);

                                                                }

                                                            });

                                                    }
                                                })

                                }
                                else
                                {
                                    response.code = "400";
                                    console.log("Fail"+response);
                                    callback(null, response);

                                }


                                });
                            }
                            else
                            {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);

                            }




                        });

                    }

                    else
                    {
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