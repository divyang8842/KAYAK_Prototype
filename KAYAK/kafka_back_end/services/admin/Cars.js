var security = require('./../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

var insertCarData = function(msg,callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="INSERT INTO car (car_type,car_color,car_model,year,car_rent) values(?,?,?,?,?)";
    var dataArry =  [];
    dataArry.push(msg.cartype);
    dataArry.push(msg.carcolor);
    dataArry.push(msg.carmodel);
    dataArry.push(msg.caryear);
    dataArry.push(msg.carrent);

    console.log("DATA: "+dataArry);
    mysql.setData(insertQuery,dataArry,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("Car","Car",err);
           // callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Successfully Car Data Inserted");
        }
        callback(null, res);

    });

};



exports.insertCarData = insertCarData;
