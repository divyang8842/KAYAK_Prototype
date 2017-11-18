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
                console.log("IN PASSPORT: "+results.id);
                res.status(201).json({status:"201",hotelid:results.id});
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
var roomcount=req.param("roomcount");
var hotelid=req.param("hotelid");

    kafka.make_request('admin_topic',{"roomtype":roomtype,"roomsize":roomsize,"guestAllowed":guestAllowed,"roomprice":roomprice,"roomcount":roomcount,"hotelid":hotelid,"action":2}, function(err,results){
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

exports.getHotelRooms=function(req,res){
	var hid=req.body.hid;
	console.log("HOTEL ID: "+hid);

	kafka.make_request('admin_topic',{"hid":hid,"action":4}, function(err,results){
        console.log('in list rooms result');
        console.log(results);
        if(err){
        	res.status(201).json({output:0});
        }
        else
        {
            //if(results.code == 200){
            	console.log("RES VALUE CHECK: "+results);
            	res.status(201).json({output:results});
            //}
          /*  else {
            	res.status(201).json({output:0});
            }*/
        }
    });
	};



  exports.updateRoom= function(req,res) {
    //var roomtype=req.param("roomtype");
    var roomsize=req.param("roomsize");
    var guestAllowed=req.param("guestAllowed");
    var roomprice=req.param("roomprice");
var roomcount=req.param("roomcount");
var roomid=req.param("roomid");
        kafka.make_request('admin_topic',{"roomsize":roomsize,"guestAllowed":guestAllowed,"roomprice":roomprice,"roomcount":roomcount,"roomid":roomid,"action":5}, function(err,results){
              console.log('in result');
              console.log(results);
              if(err){
                res.status(201).json({output:0});
              }
              else
              {
                    console.log("IN PASSPORT: ");
                    res.status(201).json({output:1});
              }
          });
  };


  exports.deleteRoom= function(req,res) {
var roomid=req.param("roomid");
        kafka.make_request('admin_topic',{"roomid":roomid,"action":6}, function(err,results){
              console.log('in result');
              console.log(results);
              if(err){
                res.status(201).json({output:0});
              }
              else
              {
                    console.log("IN PASSPORT: ");
                    res.status(201).json({output:1});
              }
          });
  };

exports.setHotelData=setHotelData;
exports.setRoomData=setRoomData;
