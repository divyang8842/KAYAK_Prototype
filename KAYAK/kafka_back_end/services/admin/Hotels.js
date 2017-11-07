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

var saveRoom = function (data,callback) {
    var query = "";
    if(data.id && data.id>0){
        query = "UPDATE room set room_type=?,room_size=?,guestAllowed=?,room_price=? WHERE room_id = ?";
    }else{
        query = "INSERT INTO room (room_type,room_size,guestAllowed,room_price) VALUES(?,?,?,?)";
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
    
}



exports.saveHotel = saveHotel;
exports.saveRoom = saveRoom;