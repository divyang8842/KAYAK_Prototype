var kafka = require('../kafka/client');


exports.usertracking= function(req,res) {

    console.log("Inside User Tracking");

    kafka.make_request('user_tracking',
        {"current_page":req.body.current_page,
            "previous_page":req.body.previous_page,
            "user_id":req.body.user_id,
            "session_id":req.body.session_id
        },
        function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                res.status(401);
            }
            else
            {
                res.status(201).json({message:"SuCCESS"});

            }
        });

};