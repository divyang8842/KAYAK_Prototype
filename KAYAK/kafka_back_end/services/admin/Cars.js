var security = require('./../utils/security');
var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');

var insertCarData = function(msg,callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var query = "INSERT INTO car_availibility(car_id,dates,available) VALUES(?,?,?)";
    var insertQuery="INSERT INTO car (car_type,car_class,car_model,car_city,car_dropoff_city,passengers,doors,bags,available_place,car_rent,car_distance,car_agency) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    var dataArry =  [];
    dataArry.push(msg.car_type);
    dataArry.push(msg.car_class);
    dataArry.push(msg.car_model);
    dataArry.push(msg.car_city);
    dataArry.push(msg.car_dropoff_city);
    dataArry.push(msg.passengers);
    dataArry.push(msg.doors);
    dataArry.push(msg.bags);
    dataArry.push(msg.available_place);
    dataArry.push(msg.car_rent);
    dataArry.push(msg.car_distance);
    dataArry.push(msg.car_agency);


    console.log("DATA: "+dataArry);
    mysql.setData(insertQuery,dataArry,function (err,results,id){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("Car","Car",err);
           // callback(null, res);
        }
        else{
            for(var i=0;i<60;i++){
                    var arrData = [];
                    arrData.push(id);
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate()+i);
                    var dateToInsert =   tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate();
                   // console.log("dateToInsert is : "+dateToInsert);
                    arrData.push(dateToInsert);
                    arrData.push(1);

                mysql.setData(query,arrData,function(err,data){
                    if(err){
                        console.log(err);
                    }

                });
            }

            res.code = "200";
            res.value=results;
            console.log("Successfully Car Data Inserted");
        }
        callback(null, res);

    },true);

};

function getCarData(msg, callback){
    console.log("In getCarData:"+ JSON.stringify(msg));
    var res={};
    var fetchQuery="SELECT * FROM car WHERE deleteflag=0";
    console.log("SELECT QUERY: "+fetchQuery);
    var dataArry =  [];
    console.log("DATA: "+dataArry);
    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        console.log("LIST CARS: "+results);
        if(err){
            errorHandler.logError("Car.js","getCarData",err);
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

function deleteCarData(msg, callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));
    var insertQuery="UPDATE car SET deleteflag=1 WHERE car_id in ("+msg.carid+")";
    console.log(insertQuery);
    var dataArry =  [];
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
};

function updateCarData(msg, callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));
    var insertQuery="UPDATE car SET car_type=?,car_class=?,car_model=?,car_city=?,car_dropoff_city=?,passengers=?,doors=?,bags=?,available_place=?,car_rent=?,car_distance=?,car_agency=? WHERE car_id="+msg.carid;
    var dataArry =  [];
    dataArry.push(msg.cartype);
    dataArry.push(msg.carclass);
    dataArry.push(msg.carmodel);
    dataArry.push(msg.carcity);
    dataArry.push(msg.car_dropoffcity);
    dataArry.push(msg.passengers);
    dataArry.push(msg.doors);
    dataArry.push(msg.bags);
    dataArry.push(msg.availableplace);
    dataArry.push(msg.carrent);
    dataArry.push(msg.cardistance);
    dataArry.push(msg.caragency);

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
};

exports.updateCarData=updateCarData;
exports.deleteCarData=deleteCarData;
exports.insertCarData = insertCarData;
exports.getCarData = getCarData;
