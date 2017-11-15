var kafka = require('../kafka/client');

var setHotelData = function (req, res, next) {
    console.log("Hotel"+req.body);
    var hotelname=req.param("hotelname");
    var hoteladdress=req.param("hoteladdress");
    var hotelcity=req.param("hotelcity");
    var hotelstate=req.param("hotelstate");
    var hotelzip=req.param("hotelzipcode");
    var hoteldesc=req.param("hoteldesc");
    var hotelameneties=req.param("hotelameneties");
    var hotelstar=req.param("hotelstar");


    kafka.make_request('admin_topic',{"hotelname":hotelname,"hoteladdress":hoteladdress,"hotelcity":hotelcity,"hotelstate":hotelstate,"hotelzipcode":hotelzip,"hoteldesc":hoteldesc,"hotelameneties":hotelameneties,"hotelstar":hotelstar,"action":1}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            res.status(201).json({output:0});
        }
        else
        {
            if(results.code == 200){
                console.log("IN PASSPORT: "+results.value);
                res.status(201).json({status:"201"});
            }
            else {
                res.status(201).json({output:0});
            }
        }
    });
}

var setRoomData = function (req, res, next) {
    console.log("Room"+req.body);
    var roomtype=req.param("roomtype");
    var roomsize=req.param("roomsize");
    var guestAllowed=req.param("guestAllowed");
    var roomprice=req.param("roomprice");



    kafka.make_request('admin_topic',{"roomtype":roomtype,"roomsize":roomsize,"guestAllowed":guestAllowed,"roomprice":roomprice,"action":2}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            res.status(201).json({output:0});
        }
        else
        {
            if(results.code == 200){
                console.log("IN PASSPORT: "+results.value);
                res.status(201).json({status:"201"});
            }
            else {
                res.status(201).json({output:0});
            }
        }
    });
}

exports.setHotelData=setHotelData;
exports.setRoomData=setRoomData;



