var kafka = require('../kafka/client');

var setFlightData = function (req, res, next) {
    console.log("Car"+req.body);
    var flightnumber=req.param("flightnumber");
    var airlinename=req.param("airlinename");
    var stationname=req.param("stationname");
    var departuretime=req.param("departuretime");
    var arrivaltime=req.param("arrivaltime");
    var flightduration=req.param("flightduration");
    var economyClassFare=req.param("economyClassFare");
    var firstClassFare=req.param("firstClassFare");
    var businessClassFare=req.param("businessClassFare");
    var premiumEcoFare=req.param("premiumEcoFare");


    kafka.make_request('admin_topic',{"flightnumber":flightnumber,"airlinename":airlinename,"stationname":stationname,"departuretime":departuretime,"arrivaltime":arrivaltime,"flightduration":flightduration,"economyClassFare":economyClassFare,"firstClassFare":firstClassFare,"businessClassFare":businessClassFare,"premiumEcoFare":premiumEcoFare,"action":7 }, function(err,results){
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



exports.setFlightData=setFlightData;



