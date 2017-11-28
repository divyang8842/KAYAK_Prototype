var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";


// CLICKS PER PAGES QUERY
mongo.connect(mongoURL, function() {

    console.log('Connected to mongo at: ' + mongoURL);
    var coll = mongo.collection('UserTracking');

    coll.find({},function (err, searchuser) {
        if(!err)
        {

            callback(null, searchuser);
        }
        else
        {

        }
    });

});


