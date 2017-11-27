var kafka = require('../kafka/client');




exports.fLightsBooking= function(req,res) {

  console.log("Inside Flight Booking");

    console.log("Flights Booking : "+req.body);

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
            "action":3
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
