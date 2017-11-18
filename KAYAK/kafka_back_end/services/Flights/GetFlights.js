var security = require('../utils/security');
var mysql=require('./../database/mysql');
//var errorHandler = require('./../utils/errorLogging');

function handle_request(msg, callback){

    console.log("In Get Files handle request:"+ JSON.stringify(msg));

    var fetchQuery="select * from flight where stops like ? and stops like ?";
    var mappingquery;
    var dataArry = [];
    var source = msg.source;
    var des = msg.Destination;
    dataArry.push('%'+source+'%');
    dataArry.push('%'+des+'%');
    var res=[];
    var temp =[];
    var indexofsource;
    var indexofdes;
    var resultforflights =[]; // array will be passed to the second query
    var finalresult = [];
    var finalresultobject ={};
    var source_price = 0;
    var destination_price = 0;
    var noofarguments = '?';

    console.log("DATA: "+dataArry);

    // First Query will fetch flight ids from flight tables based on the input parameter

    mysql.fetchData(fetchQuery,dataArry,function (err,results){
        if(results.length >0){

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

      console.log("resultforflights.length:"+resultforflights.length);
       if(resultforflights.length>0){
       if( resultforflights.length ===1)
       {

       }
       else{
            console.log("else");
        for(var res1=0;res1<resultforflights.length-1;res1++)
        {
            noofarguments = noofarguments+',?';
            console.log("noofarguments :" + noofarguments)
        }
       }
        resultforflights.push(source);
        resultforflights.push(des);
        console.log(resultforflights);

        // Second Query to fetch data based on the flight ids

        mappingquery=" select * from flight_mapping where flight_id in ("+ noofarguments+") and station_name in (?,?)";
        console.log("mappingquery : "+ mappingquery)

        mysql.fetchData(mappingquery,resultforflights,function (err,results1) {

            console.log("inside mapping"+results1);

            for(var i=0;i<results1.length;i++)
            {
                if(i%2 === 0 || i===0)
                {
                    finalresultobject.origin_station = results1[i].station_name;
                    finalresultobject.flight_departure = results1[i].flight_departure;

                    finalresultobject.airline_name = results1[i].airline_name;
                    source_price = results1[i].economy_class;
                }
                else if (i%2 ===1)
                {
                    finalresultobject.destination_station = results1[i].station_name;
                    finalresultobject.flight_arrival = results1[i].flight_arrival;

                    destination_price = results1[i].economy_class;
                    finalresultobject.totalprice = destination_price-source_price;
                    finalresultobject.duration = results1[i].flight_duration;

                    finalresult.push(finalresultobject);
                    finalresultobject ={};
                    destination_price =0;
                    source_price =0;
                }
            }

           for(var k = 0; k<finalresult.length;k++)
           {
                console.log("final Array : "+finalresult[k].origin_station);
                console.log("final Array : "+finalresult[k].destination_station);
                console.log("final Array : "+finalresult[k].flight_departure);
                console.log("final Array : "+finalresult[k].flight_arrival);
                console.log("final Array : "+finalresult[k].totalprice);
           }

            res.code = "200";
            console.log("Success---"+res);
            callback(null, finalresult);


                 });
        }

        else
            {
                var response =[]
                response.code = "200";
           console.log("Success--- but no result"+response);
           callback(null, response);
       }
        }

        else
        {
            var response =[]

            response.code = "200";
            console.log("Success--- but no result"+response);
            callback(null, response);
        }
    });




};

exports.handle_request = handle_request;
