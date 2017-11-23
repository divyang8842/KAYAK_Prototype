var kafka = require('../kafka/client');




exports.carsbooking= function(req,res) {

    console.log("Inside Cars Booking");

    kafka.make_request('get_cars',
        {"car_id":req.body.car_id,
            "start_date":req.body.Pickup,
            "end_date":req.body.Dropoff,
            "action":3
        },
        function(err,results){

            if(err){
                res.status(401).json({message:"Failed"});
            }
            else
            {
                res.status(201).json({message:"Success"});
            }

        }
        )

};