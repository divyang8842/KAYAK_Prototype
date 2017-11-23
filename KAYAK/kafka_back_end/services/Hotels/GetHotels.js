var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    console.log("In Get hotels handle request:"+ JSON.stringify(msg));

    var fetchQuery="SELECT *, count(*) as cnt FROM hotels JOIN hotel_reviews ON hotels.hotel_id = hotel_reviews.hotel_id"+
    " JOIN hotel_availability on hotels.hotel_id = hotel_availability.hotel_id"+
    " JOIN room_rates on hotels.hotel_id = room_rates.hotel_id"+ 
    " WHERE hotel_city = ? AND date >= ? AND date <= ? AND (king_rooms >= ? OR queen_rooms >= ? OR standard_rooms >= ?)"+
    " GROUP BY hotels.hotel_id";
    var dataArry = [];
    var city = msg.city;
    var checkin = msg.checkin;
    var checkout = msg.checkout;
    var rooms = msg.rooms;
    dataArry.push(city);
    dataArry.push(checkin);
    dataArry.push(checkout);
    dataArry.push(rooms);
    dataArry.push(rooms);
    dataArry.push(rooms);
    var res={};

    //counting number of days of stay
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var toDate = new Date(msg.checkout);
    var fromDate = new Date(msg.checkin);
    var numofDays = Math.round(Math.abs((toDate.getTime() - fromDate.getTime())/(oneDay)))+1;
    var hotelsResult = [];

    console.log("DATA: "+dataArry);

    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        if(results.length > 0){
            console.log('Hotels fetched');
            console.log(results);
            var count = 0;
            //check if room is available for all the days
            for(i=0;i<results.length;i++){
                if(results[i].cnt == numofDays) hotelsResult.push(results[i]);
            }
            res.code = 200;
            res.value = hotelsResult;
        }
        else{
            console.log('Unable to fetch hotels');
            res.code = 400;
        }
        callback(null, res);
    });
    
}
exports.handle_request = handle_request;
