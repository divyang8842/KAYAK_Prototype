var security = require('./../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

var afterSignUp = function(msg,callback){
  var res = {};
  console.log("In handle request:"+ JSON.stringify(msg));
  console.log("NAME: "+msg.firstname);

  var insertQuery="INSERT INTO user(fname,lname,emailid,password,zip_code,phoneno) VALUES(?,?,?,?,?,?)";
  var dataArry =  [];
  dataArry.push(msg.firstname);
  dataArry.push(msg.lastname);
  dataArry.push(msg.email);
  var encrypwd=security.encrypt(msg.password);
  dataArry.push(encrypwd);
  dataArry.push(msg.zip);
  dataArry.push(msg.phone);
  console.log("DATA: "+dataArry);
  mysql.setData(insertQuery,dataArry,function (err,results){
    /*if(err){
        errorHandler.logError("Hotel.js","saveRoom",err);
    }else{
        callback(err,results);
    }*/
    console.log("CHECK RES: "+results);
    if (err){
            res.code = "401";
            res.value = "Failed Signup";
            console.log("Failed signup---");
            //errorHandler.logError("Signup.js","saveRoom",err);
            callback(null, res);
      //throw err;
    }
    else{
          res.code = "200";
            res.value=results;
            console.log("Success---"+res.value.firstname);
            callback(null, res);
    }
});

 };
 exports.afterSignUp = afterSignUp;
