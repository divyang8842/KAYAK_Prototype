var mysql =  require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

var saveFlight = function (data,callback) {
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
};



exports.saveFlight = saveFlight;
exports.deleteFlight = deleteFlight;
