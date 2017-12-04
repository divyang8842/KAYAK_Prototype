var mysql=require('./../database/mysql');
var errorHandler = require('./../utils/errorLogging');
var mongo = require('./../database/mongo');

var insertFlightData = function(msg,callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var insertQuery="INSERT INTO flight_mapping (flight_id,airline_name,station_name,flight_departure,flight_arrival,flight_duration,economy_class,first_class,business_class,premiumeconomy_class,flight_number) values(?,?,?,?,?,?,?,?,?,?,?)";
    var query1="INSERT INTO flight (airline_name,stops) values (?,?)";
    var query2="INSERT INTO flight_availibility(flight_id,dates,economy_seates,first_seates,business_seates,premium_seates) values (?,?,?,?,?,?)";
    /*    var query3 ="Select * from flight where flight_id=(?)";
        var query4 ="Select * from flight_availibility where flight_id=(?)";*/


    var array=[];
    var array1=[];
    var array2=[];
    var dataArry1=[];
    var dataArry=[];

    array= msg.stationname.split(',');
    dataArry1.push(msg.airlinename);
    dataArry1.push(msg.stationname);



    array1.push(msg.flightnumber);
    array1.push(msg.airlinename);
    array1.push(msg.stationname);

    array2.push(msg.flightnumber);
    array2.push(msg.dates);
    array2.push(msg.economyseats);
    array2.push(msg.firstseats);
    array2.push(msg.businessseats);
    array2.push(msg.premiumseats);


    mongo.findOneDoc("flight_analytics",{"name":msg.airlinename},function(data,err){
        var currentyear = new Date().getFullYear();
        if(!data || !data._id){
            mongo.insertDoc("flight_analytics",{"name":msg.airlinename,currentyear: {count:0,revenue:0}},function(){})
        }
    });
    console.log("DATA: "+dataArry1);
    mysql.setData(query1,dataArry1,function (err,results){
        console.log("CHECK RES: "+results);
        if (err){
            //res.code = "401";
            res = "Failed Insertion";
            console.log("Failed signup---");
            errorHandler.logError("Flight","Flight",err);
            // callback(null, res);
        }
        else{
            res.code = "200";
            res.value=results;
            console.log("Successfully Flight Data Inserted");

            for(i=0;i<array.length;i++)
            {

                dataArry.push(results.insertId);
                dataArry.push(msg.airlinename);
                dataArry.push(array[i]);
                if( i=== 0)
                {
                    dataArry.push(msg.departuretime);
                }
                else
                {
                    dataArry.push(msg.departuretime);

                }
                if( i=== 0)
                {
                    dataArry.push(msg.arrivaltime);
                }
                else
                {
                    dataArry.push(msg.arrivaltime);
                }

                if( i=== 0)
                {
                    dataArry.push(0);
                }
                else
                {
                    dataArry.push(msg.flightduration);
                }

                dataArry.push();
                dataArry.push(msg.economyClassFare);
                dataArry.push(msg.firstClassFare);
                dataArry.push(msg.businessClassFare);
                dataArry.push(msg.premiumEcoFare);
                dataArry.push(msg.flightnumber);


                mysql.setData(insertQuery,dataArry,function (err,results){});
                dataArry=[];

            }

            for(var i=0;i<60;i++){
                var arrData = [];
                arrData.push(results.insertId);

                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate()+i);
                var dateToInsert =   tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate();
                // console.log("dateToInsert is : "+dateToInsert);
                arrData.push(dateToInsert);
                arrData.push(msg.ecoseats);
                arrData.push(msg.firstseats);
                arrData.push(msg.businessseats);
                arrData.push(msg.premecoseats);
                mysql.setData(query2,arrData,function(err,data){
                    if(err){
                        console.log(err);
                    }

                });
            }

        }
        callback(null, res);

    });

};

function getFlightData(msg, callback){
    console.log("In getFlight:"+ JSON.stringify(msg));
    var res={};
    var fetchQuery="SELECT * FROM flight_mapping WHERE deleteflag=0";
    console.log("SELECT QUERY: "+fetchQuery);
    var dataArry =  [];

    console.log("DATA: "+dataArry);
    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        console.log("LIST Flights: "+results);
        if(err){
            errorHandler.logError("Flight.js","getFlightData",err);
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

function deleteFlightData(msg, callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));
    var insertQuery="UPDATE flight_mapping SET deleteflag=1 WHERE flight_id in ("+msg.flightid+")";
    var dataArry =  [];
    console.log(insertQuery);

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

function updateFlightData(msg, callback){
    var res = '';
    console.log("In handle request:"+ JSON.stringify(msg));
    var insertQuery="UPDATE flight_mapping SET flight_number=?,airline_name=?,station_name=?,flight_departure=?,flight_arrival=?,flight_duration=?,economy_class=?,first_class=?,business_class=?,premiumeconomy_class=? WHERE flight_id="+msg.flightid;
    var dataArry =  [];
    dataArry.push(msg.flightnumber);
    dataArry.push(msg.airlinename);
    dataArry.push(msg.stationname);
    dataArry.push(msg.departuretime);
    dataArry.push(msg.arrivaltime);
    dataArry.push(msg.flightduration);
    dataArry.push(msg.economyClassFare);
    dataArry.push(msg.firstClassFare);
    dataArry.push(msg.businessClassFare);
    dataArry.push(msg.premiumEcoFare);
    console.log("DATA: "+dataArry);
    console.log(insertQuery);

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

exports.insertFlightData = insertFlightData;
exports.updateFlightData=updateFlightData;
exports.deleteFlightData=deleteFlightData;
exports.getFlightData = getFlightData;