var security = require('../utils/security');
var mysql=require('./../database/mysql');
var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
//var errorHandler = require('./../utils/errorLogging');

// mongo DB Inclusion
var ObjectID = require('mongodb').ObjectID;

function handle_request(msg, callback){

    var response =[];
    var fetchQuery="SELECT * FROM flight_availibility WHERE flight_id = ? AND dates = ?";
    var fetchQuery_final;
    var dataArry = [];
    var dataArry_final = [];
    dataArry.push(msg.flight_id);
    dataArry.push(msg.date);
    var final_seates;

    console.log("msg.class:"+msg.class);
    console.log("msg.noofseats:"+msg.noofseats);

    if(msg.class === "economy")
    {
        fetchQuery_final="UPDATE flight_availibility SET economy_seates = ? WHERE flight_id = ? AND dates = ?";
    }
    else if(msg.class === "first")
    {
        fetchQuery_final="UPDATE flight_availibility SET first_seates = ? WHERE flight_id = ? AND dates = ?";
    }
    else if(msg.class ==="business")
    {
        fetchQuery_final="UPDATE flight_availibility SET business_seates = ? WHERE flight_id = ? AND dates = ?";
    }

    console.log(msg.flight_departure);
    console.log(msg.totalprice);
    console.log(msg.airline_name);

        mysql.fetchData(fetchQuery,dataArry,function (err,results){

        if(results.length > 0)
        {
            console.log("first_seates "+results[0].first_seates);



            if(msg.class === "economy")
            {
                final_seates = results[0].economy_seates-msg.noofseats;
            }
            else if(msg.class === "first")
            {
                final_seates = results[0].first_seates-msg.noofseats;
            }
            else if(msg.class ==="business")
            {
                final_seates = results[0].business_seates-msg.noofseats;
            }

            dataArry_final.push(final_seates);
            dataArry_final.push(msg.flight_id);
            dataArry_final.push(msg.date);

            mysql.fetchData(fetchQuery_final,dataArry_final,function (err,results){


                if(!err)
                {

                    mongo.connect(mongoURL, function() {

                        console.log('Connected to mongo at: ' + mongoURL);
                        var coll = mongo.collection('Billing');

                        coll.findOne({"userid" : "jay"},function (err, searchuser) {
                             if(searchuser)
                             {
                                 console.log("searchuser"+searchuser.flight_total);
                                 //console.log("flight_total"+searchuser[0].flight_total);
                                 var flight_total_new = searchuser.flight_total+msg.totalprice;
                                 var number_of_flight_bookings = searchuser.flight.length ;
                                 number_of_flight_bookings = number_of_flight_bookings +1;

                                 console.log("searchuser.flight.length:"+searchuser.flight.length);
                                 console.log("flight_total_new"+flight_total_new);

                                 coll.update({userid:'jay'}, {
                                     $push: {
                                         flight: {
                                             billid:new ObjectID(),
                                             flight_id:msg.flight_id,
                                             airline_name:msg.airline_name,
                                             origin_station:msg.origin_station ,
                                             destination_station:msg.destination_station,
                                             flight_departure:msg.flight_departure,
                                             flight_arrival:msg.flight_arrival,
                                             totalprice:msg.totalprice,
                                             noofseats:msg.noofseats,
                                             class:msg.class
                                         }
                                     }
                                 }, function (err, user) {


                                     console.log("inside call back" + user);
                                     if (user) {

                                         coll.update({"userid" : "jay"},{ $set:{flight_total:flight_total_new,
                                                                                flight_count:number_of_flight_bookings}},
                                             function (err, user2) {

                                             if(!err)
                                             {
                                                 response.code = "200";
                                                 console.log("Success"+response);
                                                 callback(null, response);
                                             }
                                             else
                                             {
                                                 response.code = "400";
                                                 console.log("Fail"+response);
                                                 callback(null, response);

                                             }

                                             })

                                     }
                                     else {
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
                            }


                        )



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


}

exports.handle_request = handle_request;