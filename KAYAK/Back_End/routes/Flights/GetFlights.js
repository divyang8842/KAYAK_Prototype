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
    console.log(req.body.Source);
    console.log(req.body.Destination);
    kafka.make_request('get_flights',
        {"source":req.body.Source,"Destination":req.body.Destination,"startdate":req.body.Depart,"enddate":req.body.Return},
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