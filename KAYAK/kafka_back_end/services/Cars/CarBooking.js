var security = require('../utils/security');
var mysql=require('./../database/mysql');
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

        if(results.length >0){

            response.code = "200";
            console.log("Success--- "+response);
            callback(null, response);

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