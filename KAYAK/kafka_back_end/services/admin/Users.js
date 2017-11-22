var security = require('./../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');


function getUsers(msg, callback){
  console.log("In getRoomData:"+ JSON.stringify(msg));
 var res=[];
  var fetchQuery="SELECT user_id,fname,lname,emailid FROM user where deleteflag=0";
  var dataArry =  [];
  mysql.fetchData(fetchQuery,dataArry,function (err,results){
    console.log("LIST ROOMS: "+results);
    if(err){
        errorHandler.logError("Users.js","getUsers",err);
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
},true);
};


function deleteUser(msg, callback){
  var res = '';
  console.log("In handle request:"+ JSON.stringify(msg));
  var insertQuery="UPDATE user SET deleteflag=1 WHERE user_id=?";
  var dataArry =  [];
  dataArry.push(msg.userid);
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
            console.log("Success delete");
            callback(null, results);
    }
});
};



var newAdmin = function(msg,callback){
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
  dataArry.push(1);
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



exports.newAdmin = newAdmin;
exports.getUsers=getUsers;
exports.deleteUser=deleteUser;
