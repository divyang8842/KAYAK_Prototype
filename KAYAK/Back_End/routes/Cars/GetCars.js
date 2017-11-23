var kafka = require('../kafka/client');


exports.getCars= function(req,res) {

     console.log("Inside getCars Kafka ");
    kafka.make_request('get_cars',
        {"City":req.body.City,
         "destination":req.body.destination,
         "Pickup":req.body.Pickup,
          "Dropoff":req.body.Dropoff,
            "different_dropoff":req.body.different_drop_off,
            "action":1
        },
        function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                res.status(401).json({output:0});
            }
            else
            {

                console.log("IN Get Flights: "+results);

                for (var k = 0; k< results.length;k++)
                {
                    results[k].Pickup=req.body.Pickup;
                    results[k].Dropoff=req.body.Dropoff;

                }

                res.status(201).json({results:results,
                    Pickup:req.body.Pickup,
                    Dropoff:req.body.Dropoff});

            }
        });

    console.log("Cars : "+req.body.City);
};