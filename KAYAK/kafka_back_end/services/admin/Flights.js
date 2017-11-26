
var security = require('./../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

var insertFlightData = function(msg,callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="INSERT INTO flight_mapping (flight_number,airline_name,station_name,flight_departure,flight_arrival,flight_duration,economy_class,first_class,business_class,premiumeconomy_class) values(?,?,?,?,?,?,?,?,?,?)";
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

function getFlightData(msg, callback){
    console.log("In getCarData:"+ JSON.stringify(msg));
    var res={};
    var fetchQuery="SELECT * FROM flight_mapping WHERE deleteflag=0";
    console.log("SELECT QUERY: "+fetchQuery);
    var dataArry =  [];

    console.log("DATA: "+dataArry);
    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        console.log("LIST Flights: "+results);
        if(err){
            errorHandler.logError("Flight.js","getFlightData",err);
            res.code = "401";
            res.value = 0;
            console.log("Failed account");
            callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            callback(null, res);
        }
    });
};

function deleteFlightData(msg, callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));
    var insertQuery="UPDATE flight_mapping SET deleteflag=1 WHERE flight_id in ("+msg.flightid+")";
    var dataArry =  [];
    console.log(insertQuery);

    console.log("DATA: "+dataArry);
    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            res= "Failed Update";
            console.log("Failed update---");
            errorHandler.logError("account.js","handle_update",err);
            callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Success---");
            callback(null, results);
        }
    });
};

function updateFlightData(msg, callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));
    var insertQuery="UPDATE flight_mapping SET flight_number=?,airline_name=?,station_name=?,flight_departure=?,flight_arrival=?,flight_duration=?,economy_class=?,first_class=?,business_class=?,premiumeconomy_class=? WHERE flight_id="+msg.flightid;
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
    console.log(insertQuery);

    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            res= "Failed Update";
            console.log("Failed update---");
            errorHandler.logError("account.js","handle_update",err);
            callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Success---");
            callback(null, results);
        }
    });
};

exports.insertFlightData = insertFlightData;
exports.updateFlightData=updateFlightData;
exports.deleteFlightData=deleteFlightData;
exports.getFlightData = getFlightData;