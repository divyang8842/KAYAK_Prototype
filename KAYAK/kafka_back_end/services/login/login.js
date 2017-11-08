var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){
  console.log("In handle request:"+ JSON.stringify(msg));
 var res=[];
  var password=msg.password;
  var encrypwd=security.encrypt(password);

  var fetchQuery="SELECT user_id,emailid,password FROM user WHERE emailid=?";
  var dataArry =  [];
  dataArry.push(msg.username);
  //dataArry.push(encrypwd);

  console.log("DATA: "+dataArry);
  mysql.fetchData(fetchQuery,dataArry,function (err,results){
    /*if(err){
        errorHandler.logError("Hotel.js","saveRoom",err);
    }else{
        callback(err,results);
    }*/
    console.log("CHECK RES: "+results[0].password);
    var compare=security.compareEncrypted(msg.password,results[0].password);
    if (results && compare){
        res.code = "200";
          res.value=results;
          console.log("Success---"+res);
          callback(null, res);
    }
    else{
      res.code = "401";
      res.value = "Failed Login";
      console.log("Failed Login---");
      //errorHandler.logError("Signup.js","saveRoom",err);
      callback(null, res);
//throw err;
    }
});

};

exports.handle_request = handle_request;
