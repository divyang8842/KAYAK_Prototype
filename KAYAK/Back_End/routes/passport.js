var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {console.log("IN PASSPRT ");
    passport.use('login', new LocalStrategy(function(username   , password, done) {
console.log("USERNAME CHANEK: "+username);
    	kafka.make_request('login_topic',{"username":username,"password":password,"action":2}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
            	console.log("Error in passport");
                done(err,{});
            }
            else
            {
                if(results>0){
                	console.log("IN PASSPORT: "+results);
                    done(null,{uid:results});
                }
                else {
                    done(null,false);
                }
            }
        });
    }));
};
