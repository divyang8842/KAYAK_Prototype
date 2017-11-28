var mongo = require("../../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";



// top 10 AIr Lines Query
// Result will be an array of Object
// Example
// [ { '2017': { count: 21, revenue: 990 },
//     _id: 5a1da4fadab666e7ce59d293,
//     name: 'airindia' },
//     { '2017': { count: 19, revenue: 700 },
//         _id: 5a1da4ebdab666e7ce59d292,
//         name: 'airasia' },
//     { '2017': { count: 17, revenue: 600 },
//         _id: 5a1da4d6dab666e7ce59d291,
//         name: 'emirates' },
//     { '2017': { count: 15, revenue: 500 },
//         _id: 5a1da4c9dab666e7ce59d290,
//         name: 'jetblue' } ]
function handle_request(msg, callback) {

    var response = [];
    mongo.connect(mongoURL, function () {

        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('flight_analytics');

        coll.find({}).sort({'2017.count':-1}).limit(10).toArray(function(err, result) {

            if(!err)
            {
                console.log("Success--- inside top 10 hotel ana");
                console.log(result);
                console.log(result.length);
                callback(null, result);
            }
            else
            {

            }
        })


    });


}

exports.handle_request = handle_request;

// TOp 10 Hotel queries

//    var coll = mongo.collection('hotel_analytics');
//    coll.find({}).sort({'2017.count':-1}).limit(10).toArray(function(err, result)

// TOp 10 Car agency queries

//    var coll = mongo.collection('car_analytics');
//    coll.find({}).sort({'2017.count':-1}).limit(10).toArray(function(err, result)

// Note: These results are based on the number counts. If you want by revenue just chane 2017.count to 2017.revenue


// CLICKS PER PAGES QUERY

//     coll.find({}, function (err, searchuser) {
//         if (!err) {
//
//             callback(null, searchuser);
//         }
//         else {
//
//         }
//     });
//
// });

// Least seen page can be fetched from the above reasult itself!

// City wise revenue Query

// I have created one more collection from CITY called city_analytics

// below is the query for top 10 cities based on the revenue
//    var coll = mongo.collection('city_analytics');
//    coll.find({}).sort({'2017.count':-1}).limit(10).toArray(function(err, result)
