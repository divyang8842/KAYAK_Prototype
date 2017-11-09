var connection =  new require('./kafka/Connection');
var login = require('./services/login/login');
var signup = require('./services/login/Signup');
var getFlights = require('./services/Flights/GetFlights');

var login_topic_name = 'login_topic';
var consumer_login = connection.getConsumer(login_topic_name);

var signup_topic_name = 'signup_topic';
var consumer_signup = connection.getConsumer(signup_topic_name);

var get_flights = 'get_flights';
var consumer_get_flights = connection.getConsumer(get_flights);

var producer = connection.getProducer();


consumer_login.on('message', function (message) {
    console.log('message received in login');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    login.handle_request(data.data, function(err,res){
        console.log('after handle---'+res.value[0].user_id );
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res.value[0].user_id
                }),
                partition : 0
            }
        ];

        producer.send(payloads, function(err, data){
            console.log("PRODUCER CHECK:---");
        });
        return;
    });
});



consumer_signup.on('message', function (message) {
    console.log('message received in signup');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    signup.afterSignUp(data.data, function(err,res){
        //console.log('after handle 234 ',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
           console.log("Producer:-- ");
        });
        return;
    });
});

consumer_get_flights.on('message', function (message) {
    console.log('message received in get Files');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    getFlights.handle_request(data.data, function(err,res){
        console.log('after handle get Flights---');
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];

        producer.send(payloads, function(err, data){
            console.log("PRODUCER CHECK:---");
        });
        return;
    });
});
;
