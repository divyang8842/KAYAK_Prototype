var security = require('../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){
  console.log("In handle request:"+ JSON.stringify(msg));
 var res=[];
  var password=msg.password;
  var encrypwd=security.encrypt(password);

  var fetchQuery="SELECT user_id,emailid,password,fname,user_type FROM user WHERE emailid=?";
  var dataArry =  [];
  dataArry.push(msg.username);
  //dataArry.push(encrypwd);

  console.log("DATA: "+dataArry);
  mysql.fetchData(fetchQuery,dataArry,function (err,results){
    if(err){
        errorHandler.logError("login.js","handle_request",err);
    }
    else{

    if(results.length>0){
    var compare=security.compareEncrypted(msg.password,results[0].password);
    if (compare){
        res.code = "200";
        res.value={id:results[0].user_id,firstname:results[0].fname,type:results[0].user_type};
          //res.value=results;
          console.log("Success---"+res);
          callback(null, res);
    }
    else{
      res.code = "401";
      res.value = 0;
      console.log("Failed Login: Password wrong");
      //errorHandler.logError("Signup.js","saveRoom",err);
      callback(null, res);
//throw err;
    }
  }
  else{
    res.code = "401";
    res.value = 0;
    console.log("Failed Login: USER NOT FOUND");
    //errorHandler.logError("Signup.js","saveRoom",err);
    callback(null, res);
//throw err;
  }
}
});

};

exports.handle_request = handle_request;
