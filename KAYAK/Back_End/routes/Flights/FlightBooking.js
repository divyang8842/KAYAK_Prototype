var kafka = require('../kafka/client');




exports.fLightsBooking= function(req,res) {
var userid = req.session.user.id;
    var city = req.session.user.city;
  console.log("Inside Flight Booking");

    console.log("Flights Booking : "+req.body);
    console.log("date_return: "+req.body.date_return);
    console.log("class_return : "+req.body.class_return);
    console.log("flight_id_return : "+req.body.flight_id_return);

    kafka.make_request('get_flights',
        {"flight_id":req.body.flight_id,
            "airline_name":req.body.airline_name,
            "origin_station":req.body.origin_station,
            "destination_station":req.body.destination_station,
            "flight_departure":req.body.flight_departure,
            "flight_arrival":req.body.flight_arrival,
            "totalprice":req.body.totalprice,
            "date":req.body.date,
            "class":req.body.class,
            "noofseats":req.body.nooftickets,
            "action":3,
            "userid":userid,
            "flight_id_return":req.body.flight_id_return,
            "airline_name_return":req.body.airline_name_return,
            "origin_station_return":req.body.origin_station_return,
            "destination_station_return":req.body.destination_station_return,
            "flight_departure_return":req.body.flight_departure_return,
            "flight_arrival_return":req.body.flight_arrival_return,
            "date_return":req.body.date_return,
            "class_return":req.body.class_return,
            "noofseats_return":req.body.nooftickets_return,
            "city":city
        },
        function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                res.status(401);
            }
            else
            {

                console.log("IN Flights Booking : "+results);
                res.status(201).json({message:"SuCCESS"});

            }
        });

    res.status(200);
};
