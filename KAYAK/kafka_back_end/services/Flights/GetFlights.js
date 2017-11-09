var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    console.log("In Get Files handle request:"+ JSON.stringify(msg));

    var fetchQuery="select * from flight where stops like ? and stops like ?";
    var mappingquery=" select * from flight_mapping where flight_id in (?,?) and station_name in (?,?)";
    var dataArry = [];
    var source = "sjc";
    var des = "dubai";
    dataArry.push('%'+source+'%');
    dataArry.push('%'+des+'%');
    var res=[];
    var temp =[];
    var indexofsource;
    var indexofdes;
    var resultforflights =[]; // array will be passed to the second query
    var finalresult = [];

    console.log("DATA: "+dataArry);

    // First Query will fetch flight ids from flight tables based on the input parameter

    mysql.fetchData(fetchQuery,dataArry,function (err,results){

        console.log("result "+results[0].flight_id);

        for( var i=0;i<results.length;i++)
        {
            temp = results[i].stops.split(',');

            console.log("AirLINE--"+results[i].airline_name);
            indexofsource =temp.indexOf(source);
            indexofdes=temp.indexOf(des);
            console.log("indexofsource--"+indexofsource);
            console.log("indexofdes--"+indexofdes);

            // condition for checking irrelevent flight ids
            if (indexofsource<indexofdes)
            {
                resultforflights.push(results[i].flight_id);
            }
        }

        resultforflights.push(source);
        resultforflights.push(des);
        console.log(resultforflights);

        // Second Query to fetch data based on the flight ids

        mysql.fetchData(mappingquery,resultforflights,function (err,results1) {

            console.log("inside mapping"+results1);
            res.code = "200";
            console.log("Success---"+res);
            callback(null, res);


                 });
    });




};

exports.handle_request = handle_request;
