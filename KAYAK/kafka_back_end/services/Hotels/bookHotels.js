var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_booking(msg, callback){

    console.log("In Book hotels handle Booking:"+ JSON.stringify(msg));

    var dataArry = [];
    var hotelid = msg.hotelitem.hotel_id;
    var checkin = msg.checkin;
    var checkout = msg.checkout;
    var roomtype = msg.roomtype;
    var roomcount = msg.roomcount;
    var fetchQuery = "";
    var res={};

    console.log("roomcount:"+roomcount);

    switch(roomtype){
        case "0":{
            fetchQuery="UPDATE hotel_availability SET king_rooms = king_rooms-? WHERE hotel_id=? AND date>=? AND date<=?";
            break;
        }
        case "1":{
            fetchQuery="UPDATE hotel_availability SET queen_rooms = queen_rooms-? WHERE hotel_id=? AND date>=? AND date<=?";
            break;
        }
        case "2":{
            fetchQuery="UPDATE hotel_availability SET standard_rooms = standard_rooms-? WHERE hotel_id=? AND date>=? AND date<=?";
            break;
        }
        default:{
            console.log("invalid roomtype!")
            res.code = 400;
            break;
        }
    }
    dataArry.push(roomcount);
    dataArry.push(hotelid);
    dataArry.push(checkin);
    dataArry.push(checkout);
    

    console.log("DATA: "+dataArry);
    console.log("QUERY: "+fetchQuery);

    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        if(err){
            console.log(err);
            res.code = 400;
        }
        else{
            console.log('Hotel Booked');
            res.code = 200;
            res.value = results;
        }
        callback(null, res);
    });
}
exports.handle_booking = handle_booking;
