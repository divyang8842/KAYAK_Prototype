var security = require('../utils/security');
var mysql=require('./../database/mysql');
var mongo = require("../database/mongo_connect");
var mongoURL = "mongodb://localhost:27017/kayak_18";
//var errorHandler = require('./../utils/errorLogging');

// mongo DB Inclusion
var ObjectID = require('mongodb').ObjectID;

function handle_request(msg, callback){

    var response =[];
    var push_query;
    // response.code = "200";
    // console.log("Success--- inside flight booking"+response);
    // callback(null, response);

    mongo.connect(mongoURL, function() {

     console.log('Connected to mongo at: ' + mongoURL);
     var coll = mongo.collection('UserTracking');

    if(msg.current_page ==="FLIGHT_PAGE")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}
            , function (err, user) {
                console.log("Inside Updated FLIGHT_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { FLIGHT_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- FLIGHT_PAGE_COUNT"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { FLIGHT_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- FLIGHT_PAGE_COUNT"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
            });
    }

       else if(msg.current_page ==="CAR_PAGE")
        {

            coll.update({user_id:msg.user_id}, {
                    $push: {
                        TRACKING_ARRAY: {
                            current_page: msg.current_page,
                            previous_page:msg.previous_page,
                            user_id:msg.user_id,
                            session_id:msg.session_id,
                            time:msg.timeonpage

                        }}}  //,{ $inc: { CAR_COUNT: 1} }
                , function (err, user) {

                    console.log("Inside Updated CAR_PAGE Entry");

                    if(!err){

                    coll.update({},{$inc: { CAR_COUNT: 1 }},
                            function (err, user) {

                                console.log("inside call back" + user);
                                if (user) {
                                    response.code = "200";
                                    console.log("Success--- inside Tracking User- CAR_PAGE_COUNT"+response);
                                    callback(null, response);

                                }
                                else {
                                    response.code = "400";
                                    console.log("Fail"+response);
                                    callback(null, response);
                                }

                                        }

                        );
                    }
                    else
                    {
                        coll.update({},{$inc: { CAR_COUNT: 1 }},
                            function (err, user) {

                                console.log("inside call back" + user);
                                if (user) {
                                    response.code = "200";
                                    console.log("Success--- inside Tracking User- CAR_PAGE_COUNT"+response);
                                    callback(null, response);

                                }
                                else {
                                    response.code = "400";
                                    console.log("Fail"+response);
                                    callback(null, response);
                                }

                            }

                        );
                    }


                });
        }

    else if(msg.current_page ==="BILLING_FLIGHT")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}  //,{ $inc: { CAR_COUNT: 1} }
            , function (err, user) {

                console.log("Inside Updated BILLING_FLIGHT_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { BILLING_FLIGHT_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- BILLING_FLIGHT_COUNT"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { BILLING_FLIGHT_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- BILLING_FLIGHT_COUNT"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }


            });
    }

    else if(msg.current_page ==="SEARCH_PAGE")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}  //,{ $inc: { CAR_COUNT: 1} }
            , function (err, user) {

                console.log("Inside Updated SEARCH_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { SEARCH_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- SEARCH_COUNT"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { SEARCH_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- SEARCH_COUNT"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }


            });
    }

    else if(msg.current_page ==="HOTEL_PAGE")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}  //,{ $inc: { CAR_COUNT: 1} }
            , function (err, user) {

                console.log("Inside Updated HOTEL_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { HOTEL_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { HOTEL_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }


            });
    }

    else if(msg.current_page ==="BILLING_HOTEL")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}  //,{ $inc: { CAR_COUNT: 1} }
            , function (err, user) {

                console.log("Inside Updated HOTEL_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { BILLING_HOTEL_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { BILLING_HOTEL_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }


            });
    }

    else if(msg.current_page ==="BILLING_CAR")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}  //,{ $inc: { CAR_COUNT: 1} }
            , function (err, user) {

                console.log("Inside Updated HOTEL_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { BILLING_CAR_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { BILLING_CAR_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }


            });
    }

    else if(msg.current_page ==="SIGNIN_PAGE")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}  //,{ $inc: { CAR_COUNT: 1} }
            , function (err, user) {

                console.log("Inside Updated HOTEL_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { SIGNIN_PAGE_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { SIGNIN_PAGE_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }


            });
    }

    else if(msg.current_page ==="SIGNUP_PAGE")
    {

        coll.update({user_id:msg.user_id}, {
                $push: {
                    TRACKING_ARRAY: {
                        current_page: msg.current_page,
                        previous_page:msg.previous_page,
                        user_id:msg.user_id,
                        session_id:msg.session_id,
                        time:msg.timeonpage

                    }}}  //,{ $inc: { CAR_COUNT: 1} }
            , function (err, user) {

                console.log("Inside Updated HOTEL_PAGE Entry");

                if(!err){

                    coll.update({},{$inc: { SIGNUP_PAGE_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }
                else
                {
                    coll.update({},{$inc: { SIGNUP_PAGE_COUNT: 1 }},
                        function (err, user) {

                            console.log("inside call back" + user);
                            if (user) {
                                response.code = "200";
                                console.log("Success--- inside Tracking User- HOTEL_PAGE"+response);
                                callback(null, response);

                            }
                            else {
                                response.code = "400";
                                console.log("Fail"+response);
                                callback(null, response);
                            }

                        }

                    );
                }


            });
    }



    });

}

exports.handle_request = handle_request;