var setHotelData = function (req, res, next) {
    console.log("Hotel"+req.body);


   /* kafka.make_request('login_topic',{"path":req.body.dirName,"parent":req.body.path,"userid":req.body.userId,"createDirectory":true}, function(err,results){

        if(results.code == 200) {
            console.log("Here");
            res.status(201).json({
                status: results.code,
            });
        }


    });*/
}

exports.setHotelData=setHotelData;