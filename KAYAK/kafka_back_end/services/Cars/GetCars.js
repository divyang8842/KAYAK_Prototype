var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    console.log("In Get Cars handle request:"+ JSON.stringify(msg));

    var response =[];
    var fetchQuery;
    var dataArry = [];
    var finalresultobject ={};
    var temp = [];


    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var toDate = new Date(msg.Pickup);
    var fromDate = new Date(msg.Dropoff);
    var numofDays = Math.round(Math.abs((toDate.getTime() - fromDate.getTime())/(oneDay)))+1;

    console.log("numofDays:"+numofDays);



    if (msg.destination !=="")
    {
        fetchQuery ="SELECT *,COUNT(*) AS COUNT FROM car_availibility ca INNER JOIN car c ON ca.car_id = c.car_id WHERE car_city=? and car_dropoff_city=? AND dates >= ? AND dates <= ? AND available = 1 GROUP BY c.car_id";

        dataArry.push(msg.City);
        dataArry.push(msg.destination);
        dataArry.push(msg.Pickup);
        dataArry.push(msg.Dropoff);
    }

    else
    {
        fetchQuery ="SELECT *,COUNT(*) AS COUNT FROM car_availibility ca INNER JOIN car c ON ca.car_id = c.car_id WHERE car_city=? AND dates >= ? AND dates <= ? AND available = 1 GROUP BY c.car_id";
        dataArry.push(msg.City);
        dataArry.push(msg.Pickup);
        dataArry.push(msg.Dropoff);
        console.log("msg.City"+msg.City);
        console.log("msg.City"+msg.Pickup);
        console.log("msg.City"+msg.Dropoff);
    }

    console.log("fetchQuery"+fetchQuery);

    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        if(results.length >0){

             console.log("results:"+results.length);
             for (var i =0 ; i<results.length ; i++)
             {
                 if(results[i].COUNT == numofDays)
                 {
                     console.log("results[i]"+results[i].car_id);
                     temp.push(results[i]);
                 }
             }

             callback(null, temp);




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
