var kafka = require('../kafka/client');


exports.usertracking= function(req,res) {
    var userid;
    if(req.session.user)
    {
        userid = req.session.user.id;
    }
    else
    {
        userid = "";
    }
    var sessionid = req.sessionID;

    console.log("Inside User Tracking");

    kafka.make_request('user_tracking',
        {"current_page":req.body.current_page,
            "previous_page":req.body.previous_page,
            "user_id":userid,
            "session_id":sessionid,
            "timeonpage":req.body.timeonpage
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