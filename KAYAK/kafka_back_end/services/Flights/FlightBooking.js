var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    var response =[];
    var fetchQuery="SELECT * FROM flight_availibility WHERE flight_id = ? AND dates = ?";
    var fetchQuery_final="UPDATE flight_availibility SET first_seates = ? WHERE flight_id = ? AND dates = ?";
    var dataArry = [];
    var dataArry_final = [];
    dataArry.push(msg.flight_id);
    dataArry.push(msg.date);
    var final_seates;

        mysql.fetchData(fetchQuery,dataArry,function (err,results){

        if(results.length > 0)
        {
            console.log("first_seates "+results[0].first_seates);

            final_seates = results[0].first_seates-msg.noofseats;
            dataArry_final.push(final_seates);
            dataArry_final.push(msg.flight_id);
            dataArry_final.push(msg.date);

            mysql.fetchData(fetchQuery_final,dataArry_final,function (err,results){

                if(results.length > 0)
                {
                    response.code = "200";
                    console.log("Success--- inside flight booking"+response);
                    callback(null, response);

                }
                else
                {
                    response.code = "400";
                    console.log("Fail"+response);
                    callback(null, response);

                }

            });


        }
        else
        {
            response.code = "400";
            console.log("Fail"+response);
            callback(null, response);
        }
    });


}

exports.handle_request = handle_request;