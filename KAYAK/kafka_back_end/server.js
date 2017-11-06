var connection =  new require('./kafka/Connection');
var login = require('./services/login/login');
var signup = require('./services/login/Signup');

var login_topic_name = 'login_topic';
var consumer_login = connection.getConsumer(login_topic_name);

var signup_topic_name = 'signup_topic';
var consumer_signup = connection.getConsumer(signup_topic_name);

var producer = connection.getProducer();


consumer_login.on('message', function (message) {
    console.log('message received in login');
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    login.handle_request(data.data, function(err,res){
        //console.log('after handle'+ JSON.stringify(res) );
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
            //console.log(data);
        });
        return;
    });
});


consumer_signup.on('message', function (message) {
    console.log('message received in signup');
   // console.log(JSON.stringify(message.value));
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
           // console.log(data);
        });
        return;
    });
});