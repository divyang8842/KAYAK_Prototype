var kafka = require('../kafka/client');




exports.fLightsBooking= function(req,res) {

  console.log("Inside Flight Booking");

    console.log("Flights Booking : "+req.body);

    kafka.make_request('get_flights',
        {"flight_id":req.body.flight_id,
            "date":req.body.date,
            "class":"firstclass",
            "noofseats":5,
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
