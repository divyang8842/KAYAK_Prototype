var kafka = require('../kafka/client');

exports.getHotels= function(req,res) {

    console.log("Inside getHotels");
    console.log(req.body.city);
    kafka.make_request('hotels_topic',
        {"action":"getHotels","city":req.body.city},
        function(err,results){
            console.log(results);
            
            if(results.code == 400)
            {
                console.log("Unable to fetch hotels");
                res.status(400).json({message:"Unable to fetch hotels"});
            }
            else if(results.code == 200){
                console.log("Hotels Fetched!");
                res.status(200).json(results);
            }
            else{
                console.log("ERROR");
                res.status(400).json({message:"Unable to fetch hotels"});
            }
    });

    console.log("Hotels : "+req.body);
};