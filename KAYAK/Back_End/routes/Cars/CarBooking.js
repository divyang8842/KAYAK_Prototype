var kafka = require('../kafka/client');




exports.carsbooking= function(req,res) {

    var userid = req.session.user.id;

    console.log("Inside Cars Booking");

    kafka.make_request('get_cars',
        {"car_id":req.body.car_id,
            "car_model":req.body.car_model,
            "car_type":req.body.car_type,
            "car_class":req.body.car_class,
            "car_city":req.body.car_city,
            "start_date":req.body.Pickup,
            "end_date":req.body.Dropoff,
            "car_rent":req.body.car_rent,
            "action":3,
            "userid":userid,
            "car_agency":"Santa Clara"
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