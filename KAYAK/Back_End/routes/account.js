var kafka = require('./kafka/client');

exports.account= function(req,res) {
    	var uid=req.param("uid");

      console.log("USERID CHECK: "+uid);
    	kafka.make_request('login_topic',{"uid":uid,"action":3}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
            	res.status(201).json({output:0});
            }
            else
            {
                	//res.status(201).json({output:1});
                  res.status(201).send({output:results});
            }
        });
};


exports.update= function(req,res) {
      var fname=req.param("firstname");
      var lname=req.param("lastname");
      var add=req.param("add");
      var city=req.param("city");
      var state=req.param("state");
      var zip=req.param("zip");
      var phone=req.param("phone");
      var card=req.param("card");
      var uid=req.param("uid");
      var em=req.param("email");
      console.log("USERID STATE: "+state);
      kafka.make_request('login_topic',{"uid":uid,"firstname":fname,"lastname":lname,"add":add,"city":city,"state":state,"phone":phone,"card":card,"zip":zip,"email":em,"action":4}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
              res.status(201).json({output:0});
            }
            else
            {
                  console.log("IN PASSPORT: "+results.value);
                  res.status(201).json({output:1});  
            }
        });
};

exports.password= function(req,res) {
      var uid=req.session.user;
      var pwd=req.param("password");
      console.log("USERID CHECK: "+uid);
      kafka.make_request('login_topic',{"uid":uid,"password":pwd,"action":6}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
              res.status(201).json({output:0});
            }
            else
            {
                if(results.code == 1){
                  console.log("IN PASSPORT: "+results.value);
                  res.status(201).json({output:1});
                }
                else {
                  res.status(201).json({output:0});
                }
            }
        });
};
