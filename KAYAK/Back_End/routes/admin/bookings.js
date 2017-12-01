
var kafka = require('../kafka/client');


exports.getHotelBookings= function(req,res) {

    console.log("Inside Hotel Bookings");

    kafka.make_request('admin_topic',
        {
            "action":17
        },
        function(err,results){
            console.log('in result');
            if(err){
                res.status(401);
            }
            else
            {
                console.log(results);
                res.status(201).json({data:results.bookinglist});

            }
        });

};

exports.getFlightBookings= function(req,res) {

    console.log("Inside Flight Bookings");

    kafka.make_request('admin_topic',
        {
            "action":18
        },
        function(err,results){
            console.log('in result');
            if(err){
                res.status(401);
            }
            else
            {
                console.log(results);
                res.status(201).json({data:results.bookinglist});

            }
        });

};

exports.getCarBookings= function(req,res) {

    console.log("Inside Car Bookings");

    kafka.make_request('admin_topic',
        {
            "action":19
        },
        function(err,results){
            console.log('in result');
            if(err){
                res.status(401);
            }
            else
            {
                console.log(results);
                res.status(201).json({data:results.bookinglist});

            }
        });

};