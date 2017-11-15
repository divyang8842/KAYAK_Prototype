/*
var mysql =  require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

var saveHotel = function (data,callback) {
    var  query = "INSERT INTO hotel (hotel_name,hotel_address,hotel_city,hotel_state,hotel_zipcode,hotel_description,hotel_ameneties) values(?,?,?,?,?,?,?)";
    var dataArry =  [];

    mysql.setData(query,dataArry,function(err,results){

        if(err){
           errorHandler.logError("Hotel.js","saveHotel",err);
        }else{
            
            
            console.log("Hotel added successfully.")
        }
        callback(err,results);
    })
};

var saveRoom = function (hotel_id,data,callback) {
    var query = "";
    if(data.id && data.id>0){
        query = "UPDATE room set room_type=?,room_size=?,guestAllowed=?,room_price=? WHERE room_id = ?";
    }else{
        query = "INSERT INTO room (hotel_id,room_type,room_size,guestAllowed,room_price) VALUES(?,?,?,?)";
    }
    var dataArry =  [];
    if(data instanceof Array == false){
        var dataArry = [];
        dataArry.push(data);
        data = dataArry;
    }

    var length = data.length;
    while(length>0){
        var room = data[--length];
        var roomData  = [];
        if(data.id && data.id>0){
            roomData.push(data.id);
        }
        dataArry.push(roomData);
    }
    if(dataArry.length<=1){
        dataArry = dataArry[0];
    }else{
        dataArry = [dataArry];
    }
    mysql.setData(query,dataArry,function (err,results){
        if(err){
            errorHandler.logError("Hotel.js","saveRoom",err);
        }else{
            callback(err,results);
        }
    });
};

var deleteHotel = function(data,callback){
    var query = "UPDATE hotel SET deleteflag = 1 WHERE hotel_id = ?";
    mysql.setData(query,[data.hotel_id],function(err,results){
       callback(err,results);
    });
};

var deleteRoom = function(data,callback){
    var query = "UPDATE room SET deleteflag = 1 WHERE hotel_id = ?";
    mysql.setData(query,[data.room_id],function(err,results){
        callback(err,results);
    });
};

exports.deleteHotel = deleteHotel;
exports.saveHotel = saveHotel;
exports.saveRoom = saveRoom;
exports.deleteRoom = deleteRoom;*/

var security = require('./../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

var insertHotelData = function(msg,callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="INSERT INTO hotels (hotel_name,hotel_star,hotel_location,hotel_city,hotel_state,hotel_zipcode,hotel_description) values(?,?,?,?,?,?,?)";
    var dataArry =  [];
    dataArry.push(msg.hotelname);
    dataArry.push(msg.hotelstar);
    dataArry.push(msg.hoteladdress);
    dataArry.push(msg.hotelcity);
    dataArry.push(msg.hotelstate);
    dataArry.push(msg.hotelzipcode);
    dataArry.push(msg.hoteldesc);
    console.log("DATA: "+dataArry);
    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("Signup.js","afterSignUp",err);
            callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Successfully Hotel Data Inserted");
            callback(null, results);
        }
    });

};


var insertRoomData = function(msg,callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="INSERT INTO room (room_type,room_size,guestAllowed,room_price) values(?,?,?,?)";
    var dataArry =  [];
    dataArry.push(msg.roomtype);
    dataArry.push(msg.roomsize);
    dataArry.push(msg.guestAllowed);
    dataArry.push(msg.roomprice);

    console.log("DATA: "+dataArry);
    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("Signup.js","afterSignUp",err);
            callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Successfully Room Data Inserted");
            callback(null, results);
        }
    });

};


exports.insertHotelData = insertHotelData;
exports.insertRoomData=insertRoomData;