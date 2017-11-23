var kafka = require('../kafka/client');



exports.getUsers=function(req,res){
	kafka.make_request('admin_topic',{action:20}, function(err,results){
        console.log('in list users result');
        console.log(results);
        if(err){
        	res.status(201).json({output:0});
        }
        else
        {
            	console.log("RES VALUE CHECK: "+results);
            	res.status(201).json({output:results});
        }
    });
	};

  exports.updateRoom= function(req,res) {

  };


  exports.deleteUser= function(req,res) {
var userid=req.param("userid");
        kafka.make_request('admin_topic',{"userid":userid,"action":21}, function(err,results){
              console.log('in result');
              console.log(results);
              if(err){
                res.status(201).json({output:0});
              }
              else
              {
                    console.log("IN PASSPORT: ");
                    res.status(201).json({output:1});
              }
          });
  };


	exports.newAdmin= function(req,res) {
	    	var fname=req.param("firstname");
	    	var lname=req.param("lastname");
	    	var email=req.param("email");
	    	var password=req.param("pass");
	      console.log("FROM FORM: "+fname+lname+email+password);
	    	kafka.make_request('admin_topic',{"firstname":fname,"lastname":lname,"email":email,"password":password,"phone":0,"zip":'',"action":22}, function(err,results){
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
	};
