var kafka = require('../kafka/client');


// var getFLights = function (req, res, next) {
//     console.log("Flights : "+req.body);
//
//
// }
//
// exports.getFLights=getFLights;

exports.getFLights= function(req,res) {

    console.log("Inside getFiles Kafka ");
    kafka.make_request('get_flights',
        {"firstname":"Jay"},
        function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            res.status(201).json({output:0});
        }
        else
        {

                console.log("IN Get Flights: "+results);
                res.status(201).json({results});

        }
    });

    console.log("Flights : "+req.body);
};