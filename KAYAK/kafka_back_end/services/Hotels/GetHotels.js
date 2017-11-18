var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    console.log("In Get hotels handle request:"+ JSON.stringify(msg));

    var fetchQuery="SELECT * FROM hotels JOIN hotel_reviews ON hotels.hotel_id = hotel_reviews.hotel_id WHERE hotel_city = ?";
    var dataArry = [];
    var city = msg.city;
    dataArry.push(city);
    var res={};

    console.log("DATA: "+dataArry);

    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        if(results.length > 0){
            console.log('Hotels fetched');
            res.code = 200;
            res.value = results;
        }
        else{
            console.log('Unable to fetch hotels');
            res.code = 400;
        }
        callback(null, res);
    });
    
}
exports.handle_request = handle_request;
