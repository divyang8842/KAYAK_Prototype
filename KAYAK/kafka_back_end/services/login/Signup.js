var security = require('./../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');


var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
var ObjectID = require('mongodb').ObjectID;

var afterSignUp = function(msg,callback){
  var res = '';
  console.log("In handle request:"+ JSON.stringify(msg));
  console.log("NAME: "+msg.firstname);

  var insertQuery="INSERT INTO user(fname,lname,emailid,password,zip_code,phoneno,user_type) VALUES(?,?,?,?,?,?,?)";
  var dataArry =  [];
  dataArry.push(msg.firstname);
  dataArry.push(msg.lastname);
  dataArry.push(msg.email);
  var encrypwd=security.encrypt(msg.password);
  dataArry.push(encrypwd);
  dataArry.push(msg.zip);
  dataArry.push(msg.phone);
  dataArry.push(0);
  console.log("DATA: "+dataArry);
  mysql.setData(insertQuery,dataArry,function (err,results){
    console.log("CHECK RES: "+results);
    if (err){
            res = "401";
            //res.value = "Failed Signup";
            console.log("Failed signup---");
            errorHandler.logError("Signup.js","afterSignUp",err);
            callback(null, res);
    }
    else{


        // Code Added By Jay Desai
        // Structure - Billing
        mongo.connect(mongoURL, function() {

            console.log('Connected to mongo at: ' + mongoURL);
            var coll = mongo.collection('Billing');

            coll.insert({userid: results.insertId,
                    flight:[],
                    flight_total:0,
                    flight_count:0,
                    car:[],
                    car_total:0,
                    car_count:0,
                    hotel:[],
                    hotel_total:0,
                    hotel_count:0
                },
                function(err, user)
                {
                    if(!err)
                    {
                        res= '200';
                          //res.value=results;
                          console.log("Success---"+res.code);
                          callback(null, res);
                    }
                    else
                    {
                        res = '401';
                        console.log("Failed signup---");
                        errorHandler.logError("Signup.js","afterSignUp",err);
                        callback(null, res);

                    }
                }
                )

        })

    }
},true);
 };


 function check_user(msg, callback){
   console.log("In handle request of CHECKUSER:"+ JSON.stringify(msg));
  var res=[];
   var fetchQuery="SELECT * FROM user WHERE emailid=?";
   var dataArry =  [];
   dataArry.push(msg.un);
   console.log("DATA: "+dataArry);
   mysql.fetchData(fetchQuery,dataArry,function (err,results){
     console.log("CHECK RES: "+results);
     if(err){
         errorHandler.logError("Signup.js","check_user",err);
     }
     else{
     if(results.length){
           res.value=0;
           console.log("USER DOES EXISTS");
           callback(null, res);
     }
     else{
       res.value = 1;
       console.log("USER DOES NOT EXISTS");
       callback(null, res);
     }
   }
   });
   };

 exports.check_user = check_user;
 exports.afterSignUp = afterSignUp;
