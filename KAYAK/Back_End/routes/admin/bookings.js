
var kafka = require('../kafka/client');


exports.getHotelBookings= function(req,res) {
    var session = req.session;
console.log("USERTYPE"+session.user.type);
    console.log("Inside Hotel Bookings");

    kafka.make_request('admin_topic',
        {
            "action":17,"user_type":session.user.type,"userid":session.user.id
        },
        function(err,results){
            console.log('in result');
            if(err){
                res.status(401);
            }
            else
            {
                console.log("result is  : "+JSON.stringify(results));
                res.status(201).json({data:results.bookinglist});

            }
        });

};

exports.getFlightBookings= function(req,res) {
    console.log("Inside Flight Bookings");
    var session = req.session;
    kafka.make_request('admin_topic',
        {
            "action":18,"user_type":session.user.type,"userid":session.user.id
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
    var session = req.session;
    kafka.make_request('admin_topic',
        {
            "action":19,"user_type":session.user.type,"userid":session.user.id
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