var kafka = require('./kafka/client');

exports.checkuser= function(req,res) {
    	var un=req.param("uname");

      console.log("USERID CHECK: "+un);
    	kafka.make_request('login_topic',{"un":un,"action":5}, function(err,results){
            console.log('in result');
            console.log("CHECK USER: "+results);
            if(err){
            	res.status(201).json({output:0});
            }
            else
            {
                  res.status(201).send({output:results});
            }
        });
};
