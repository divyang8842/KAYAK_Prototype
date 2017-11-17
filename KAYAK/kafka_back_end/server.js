var connection =  new require('./kafka/Connection');
var login = require('./services/login/login');
var signup = require('./services/login/Signup');
var account = require('./services/login/account');
var getFlights = require('./services/Flights/GetFlights');
var getHotels = require('./services/Hotels/GetHotels');
var admin_Hotel=require('./services/admin/Hotels');
var admin_Car=require('./services/admin/Cars');

var login_topic_name = 'login_topic';
var consumer_login = connection.getConsumer(login_topic_name);

var get_flights = 'get_flights';
var consumer_get_flights = connection.getConsumer(get_flights);

var hotels = 'hotels_topic';
var consumer_hotels = connection.getConsumer(hotels);

var admin_topic_name='admin_topic';
var consumer_HotelsOps=connection.getConsumer(admin_topic_name);
var producer = connection.getProducer();


consumer_login.on('message', function (message) {
    console.log('message received in login');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action=data.data.action;
    console.log("ACTION-----"+data.data.action);
    if(action==2){
    login.handle_request(data.data, function(err,res){
        console.log('after handle---');
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res.value[0]
                }),
                partition : 0
            }
        ];

        producer.send(payloads, function(err, data){
            console.log("PRODUCER CHECK:---");
        });
        return;
    });}

    else if(action==1){
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
    }

    if(action==5){
    signup.check_user(data.data, function(err,res){
        console.log('after handle---');
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res.value
                }),
                partition : 0
            }
        ];
console.log("TRUE: "+res.value);
        producer.send(payloads, function(err, data){
            console.log("PRODUCER CHECK:---");
        });
        return;
    });}

    else if(action==3){
      account.handle_request(data.data, function(err,res){
          //console.log('after handle 234 ',res);
          console.log('after handle---');
          var payloads = [
              { topic: data.replyTo,
                  messages:JSON.stringify({
                      correlationId:data.correlationId,
                      data : res.value[0]
                  }),
                  partition : 0
              }
          ];
          producer.send(payloads, function(err, data){
             console.log("Producer:-- ");
          });
          return;
      });
    }

    else if(action==4){
      account.handle_update(data.data, function(err,res){
          //console.log('after handle 234 ',res);
          console.log('after handle---');
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
    }
});

consumer_get_flights.on('message', function (message) {
    console.log('message received in get Files');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action=data.data.action;
    console.log("ACTION-----"+data.data.action);

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

consumer_HotelsOps.on('message', function (message) {
    console.log('message received in Hotels');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action=data.data.action;
    if(action==1) {
        admin_Hotel.insertHotelData(data.data, function (err, res) {
            console.log('after handle insertHotel---' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                console.log("PRODUCER CHECK:---");
            });
            return;
        });
    }
    else if(action==2) {
        admin_Hotel.insertRoomData(data.data, function (err, res) {
            console.log('after handle insert Room---' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                console.log("PRODUCER CHECK:---");
            });
            return;
        });
    }
    else if(action==3) {
        admin_Car.insertCarData(data.data, function (err, res) {
            console.log('after handle insert Cars---' + JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];

            producer.send(payloads, function (err, data) {
                console.log("PRODUCER CHECK:---");
            });
            return;
        });
    }
});

consumer_hotels.on('message', function (message) {
    console.log('message received in hotels consumer');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action=data.data.action;
    console.log("ACTION-----"+data.data.action);
    if(action=="getHotels"){
    getHotels.handle_request(data.data, function(err,res){
        console.log('after handle---');
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
    });}
});
