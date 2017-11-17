var security = require('../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){
  console.log("In handle request:"+ JSON.stringify(msg));
 var res=[];
  var fetchQuery="SELECT * FROM user WHERE user_id=?";
  var dataArry =  [];
  dataArry.push(msg.uid);
  console.log("DATA: "+dataArry);
  mysql.fetchData(fetchQuery,dataArry,function (err,results){
    if(err){
        errorHandler.logError("account.js","handle_request",err);
        res.code = "401";
        res.value = 0;
        console.log("Failed account");
        callback(null, res);
    }
    else{
      res.code = "200";
        res.value=results;
        callback(null, res);
}
});
};

var handle_update = function(msg,callback){
  var res = '';
  console.log("In handle request:"+ JSON.stringify(msg));

  var insertQuery="UPDATE user SET fname=?,lname=?,address=?,city=?,state=?,zip_code=?,phoneno=?,credit_card=?,emailid=? WHERE user_id="+msg.uid;
  var dataArry =  [];
  dataArry.push(msg.firstname);
  dataArry.push(msg.lastname);
  dataArry.push(msg.add);
  dataArry.push(msg.city);
  dataArry.push(msg.state);
  dataArry.push(msg.zip);
  dataArry.push(msg.phone);
  dataArry.push(msg.card);
  dataArry.push(msg.email);
  console.log("DATA: "+dataArry);
  mysql.setData(insertQuery,dataArry,function (err,results){
    console.log("CHECK RES: "+results);
    if (err){
            res= "Failed Update";
            console.log("Failed update---");
            errorHandler.logError("account.js","handle_update",err);
            callback(null, res);
    }
    else{
          res.code = "200";
            res.value=results;
            console.log("Success---");
            callback(null, results);
    }
});
}

var update_password = function(msg,callback){
  var res = '';
  console.log("In handle request:"+ JSON.stringify(msg));
  var dataArry =  [];
  var insertQuery="UPDATE user SET password=? WHERE user_id="+msg.uid;
  var encrypwd=security.encrypt(msg.password);
  dataArry.push(encrypwd);
  console.log("DATA: "+dataArry);
  mysql.setData(insertQuery,dataArry,function (err,results){
    console.log("CHECK RES: "+results);
    if (err){
      res.code = "0";
            console.log("Failed update---");
            errorHandler.logError("account.js","change_password",err);
            callback(null, res);
    }
    else{
          res.code = "1";
            res.value=results;
            console.log("Success---");
            callback(null, res);
    }
});
}

exports.handle_request = handle_request;
exports.handle_update = handle_update;
exports.update_password = update_password;
