var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    console.log("In Get Cars handle request:"+ JSON.stringify(msg));

    var response =[];
    var fetchQuery;
    var dataArry = [];
    var finalresultobject ={};

    console.log("msg.City"+msg.City);
    console.log("msg.destination"+msg.destination);

    if (msg.different_dropoff)
    {
        fetchQuery ="select * from car where car_city =? and car_dropoff_city=?";
        dataArry.push(msg.City);
        dataArry.push(msg.destination);
    }

    else
    {
        fetchQuery ="select * from car where car_city =?";
        dataArry.push(msg.City);
    }

    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        if(results.length >0){

            console.log("results:"+results);
            callback(null, results);


        }
        else
        {
            response.code = "200";
            console.log("Success--- but no result"+response);
            callback(null, response);
        }

    });
};

exports.handle_request = handle_request;
