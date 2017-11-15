var security = require('./../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

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
            //res.code = "401";
            res = "Failed Signup";
            console.log("Failed signup---");
            errorHandler.logError("Signup.js","afterSignUp",err);
            callback(null, res);
    }
    else{
          res.code = "200";
            res.value=results;
            console.log("Success---");
            callback(null, results);
    }
});
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
     if(results.length>0){
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
