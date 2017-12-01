var kafka = require('./kafka/client');

exports.signup= function(req,res) {
    	var fname=req.param("firstname");
    	var lname=req.param("lastname");
    	var email=req.param("email");
    	var password=req.param("pass");
      var phone=req.param("phone");
      var zip=req.param("zip");
    	kafka.make_request('login_topic',{"firstname":fname,"lastname":lname,"email":email,"password":password,"phone":0,"zip":'',"action":1}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
            	res.status(201).json({output:0});
            }
            else
            {
                if(results == "200"){
                	res.status(201).json({output:1});
                }
                else {
                	res.status(201).json({output:0});
                }
            }
        });
};
