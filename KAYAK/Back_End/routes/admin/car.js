var kafka = require('../kafka/client');

var setCarData = function (req, res, next) {
    console.log("Car"+req.body);
    var cartype=req.param("cartype");
    var carcolor=req.param("carcolor");
    var carmodel=req.param("carmodel");
    var caryear=req.param("caryear");
    var carrent=req.param("carrent");



    kafka.make_request('admin_topic',{"cartype":cartype,"carcolor":carcolor,"carmodel":carmodel,"caryear":caryear,"carrent":carrent,"action":1}, function(err,results){
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

exports.setCarData=setCarData;



