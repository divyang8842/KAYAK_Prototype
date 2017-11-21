
/*var saveFlight = function (data,callback) {
    var  query = "INSERT INTO flight (airline_name,flight_origin,flight_destination,flight_departure,flight_arrival,flight_duration,flight_ticketPrice,flight_class) values(?,?,?,?,?,?,?,?)";
    var dataArry =  [];

    mysql.setData(query,dataArry,function(err,results){

        if(err){
            errorHandler.logError("Flight.js","saveFlight",err);
        }else{


            console.log("Flight added successfully.")
        }
        callback(err,results);
    })
};


var deleteFlight = function(data,callback){
    var query = "UPDATE flight SET deleteflag = 1 WHERE flight_id = ?";
    mysql.setData(query,[data.flight_id],function(err,results){
        callback(err,results);
    });
};*/


var security = require('./../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

var insertFlightData = function(msg,callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="INSERT INTO flight_mapping (flight_id,airline_name,station_name,flight_departure,flight_arrival,flight_duration,economy_class,first_class,business_class,premiumeconomy_class) values(?,?,?,?,?,?,?,?,?,?)";
    var dataArry =  [];
    dataArry.push(msg.flightnumber);
    dataArry.push(msg.airlinename);
    dataArry.push(msg.stationname);
    dataArry.push(msg.departuretime);
    dataArry.push(msg.arrivaltime);
    dataArry.push(msg.flightduration);
    dataArry.push(msg.economyClassFare);
    dataArry.push(msg.firstClassFare);
    dataArry.push(msg.businessClassFare);
    dataArry.push(msg.premiumEcoFare);

    console.log("DATA: "+dataArry);
    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("Flight","Flight",err);
            // callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Successfully Flight Data Inserted");
        }
        callback(null, res);

    });

};

exports.insertFlightData = insertFlightData;