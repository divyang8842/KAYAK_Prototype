var kafka = require('../kafka/client');

var setCarData = function (req, res, next) {
    console.log("Car"+req.body);
    var cartype=req.param("car_type");
    var carclass=req.param("car_class");
    var carmodel=req.param("car_model");
    var carcity=req.param("car_city");
    var car_dropoffcity=req.param("car_dropoff_city");
    var passengers=req.param("passengers");
    var doors=req.param("doors");
    var bags=req.param("bags");
    var availableplace=req.param("available_place");
    var carrent=req.param("car_rent");
    var cardistance=req.param("car_distance");



    kafka.make_request('admin_topic',{"car_type":cartype,"car_class":carclass,"car_model":carmodel,"car_city":carcity,"car_dropoff_city":car_dropoffcity,"passengers":passengers,"doors":doors,"bags":bags,"available_place":availableplace,"car_rent":carrent,"car_distance":cardistance,"action":3}, function(err,results){
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

exports.getCarData=function(req,res){

    kafka.make_request('admin_topic',{"action":9}, function(err,results){
        console.log('in list cars result');
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

exports.deleteCar= function(req,res) {
    var carid=req.param("carid");
    console.log(carid);
    kafka.make_request('admin_topic',{"carid":carid,"action":10}, function(err,results){
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

exports.updateCar= function(req,res) {
    var carid=req.param("carid");
    var cartype=req.param("cartype");
    var carclass=req.param("carclass");
    var carmodel=req.param("carmodel");
    var carcity=req.param("carcity");
    var car_dropoffcity=req.param("car_dropoffcity");
    var passengers=req.param("passengers");
    var doors=req.param("doors");
    var bags=req.param("bags");
    var availableplace=req.param("availableplace");
    var carrent=req.param("carrent");
    var cardistance=req.param("cardistance");
    kafka.make_request('admin_topic',{"cartype":cartype,"carclass":carclass,"carmodel":carmodel,"carcity":carcity,"car_dropoffcity":car_dropoffcity,"passengers":passengers,"doors":doors,"bags":bags,"availableplace":availableplace,"carrent":carrent,"cardistance":cardistance,"carid":carid,"action":11}, function(err,results){
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



exports.setCarData=setCarData;



