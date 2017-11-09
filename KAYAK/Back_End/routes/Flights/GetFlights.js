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
            if(results.code == 200){
                console.log("IN PASSPORT: "+results.value);
                res.status(201).json({output:1});
            }
            else {
                res.status(201).json({output:0});
            }
        }
    });

    console.log("Flights : "+req.body);
};