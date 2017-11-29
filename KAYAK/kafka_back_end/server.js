var connection =  new require('./kafka/Connection');
var login = require('./services/login/login');
var signup = require('./services/login/Signup');
var account = require('./services/login/account');
var getFlights = require('./services/Flights/GetFlights');
var flightsbooking = require('./services/Flights/FlightBooking');
var getHotels = require('./services/Hotels/GetHotels');
var bookHotels = require('./services/Hotels/bookHotels');
var getCars = require('./services/Cars/GetCars');
var carbooking = require('./services/Cars/CarBooking');
var admin_Hotel=require('./services/admin/Hotels');
var admin_Car=require('./services/admin/Cars');
var admin_Flight=require('./services/admin/Flights');
var admin_Users=require('./services/admin/Users');
var file_utils = require('./services/utils/FileUtils');
var user_tracking = require('./services/UserTracking/UserTracking');
var chart = require('./services/admin/analytics/chartsData');

var fs = require('fs');

var login_topic_name = 'login_topic';
var consumer_login = connection.getConsumer(login_topic_name);

var get_flights = 'get_flights';
var consumer_get_flights = connection.getConsumer(get_flights);

var hotels = 'hotels_topic';
var consumer_hotels = connection.getConsumer(hotels);

var cars = 'get_cars';
var consumer_cars = connection.getConsumer(cars);

var admin_topic_name='admin_topic';
var consumer_HotelsOps=connection.getConsumer(admin_topic_name);

var upload_topic = 'upload_avatar';
var consumer_upload_avatar = connection.getConsumer(upload_topic);

var download_topic = 'download_avatar';
var consumer_download_avatar = connection.getConsumer(download_topic);

var tracking_topic = 'user_tracking';
var consumer_user_tracking = connection.getConsumer(tracking_topic);

var charts_topic = "charts_data";
var consumer_charts = connection.getConsumer(charts_topic);

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
                    data : res.value
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
    var action = data.data.action;
    console.log("ACTION-----" + data.data.action);

    if(action==1)
    {
        getFlights.handle_request(data.data, function (err, res) {
        console.log('after handle get Flights---');
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

    else if(action==3)
    {
        flightsbooking.handle_request(data.data, function (err, res) {
            console.log('after handle get Flights---');
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

consumer_cars.on('message', function (message) {

    console.log('message received in get Cars');

    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action = data.data.action;
    console.log("ACTION-----" + data.data.action);

   if(action==1)
   {
    getCars.handle_request(data.data, function (err, res) {
        console.log('after handle get Cars---');
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


    else if(action==3)
    {
        carbooking.handle_request(data.data, function (err, res) {
            console.log('after handle get Cars---');
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

consumer_HotelsOps.on('message', function (message) {
    console.log('message received in Hotels');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action=data.data.action;
    console.log("ACTION-----"+data.data.action);
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

    else if(action==4){
    	admin_Hotel.getRoomData(data.data, function(err,res){
            console.log('after handle'+res.value[0].count);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res.value
                    }),
                    partition : 0
                }];
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }

        else if(action==5){
          admin_Hotel.updateRoomData(data.data, function(err,res){
                //console.log('after handle'+res.value[0].count);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res.value
                        }),
                        partition : 0
                    }];
                producer.send(payloads, function(err, data){
                    console.log("Producer:-- ");
                });
                return;
            });
            }

            else if(action==6){
              admin_Hotel.deleteRoomData(data.data, function(err,res){
                    //console.log('after handle'+res.value[0].count);
                    var payloads = [
                        { topic: data.replyTo,
                            messages:JSON.stringify({
                                correlationId:data.correlationId,
                                data : res.value
                            }),
                            partition : 0
                        }];
                    producer.send(payloads, function(err, data){
                        console.log("Producer:-- ");
                    });
                    return;
                });
                }
    else if(action==7) {
        admin_Flight.insertFlightData(data.data, function (err, res) {
            console.log('after handle insert Flights---' + JSON.stringify(res));
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
    else if(action==8) {
        admin_Hotel.getHotelData(data.data, function (err, res) {
            console.log('after handle get Hotels---' + JSON.stringify(res));
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
    else if(action==9) {
        admin_Car.getCarData(data.data, function (err, res) {
            console.log('after handle get Hotels---' + JSON.stringify(res));
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
    else if(action==10) {
        admin_Car.deleteCarData(data.data, function (err, res) {
            console.log('after handle delete Cars---' + JSON.stringify(res));
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
    else if(action==11){
        admin_Car.updateCarData(data.data, function(err,res){
            //console.log('after handle'+res.value[0].count);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res.value
                    }),
                    partition : 0
                }];
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
    }
    else if(action==12) {
        admin_Flight.getFlightData(data.data, function (err, res) {
            console.log('after handle get Hotels---' + JSON.stringify(res));
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
    else if(action==13) {
        admin_Flight.deleteFlightData(data.data, function (err, res) {
            console.log('after handle delete Cars---' + JSON.stringify(res));
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
    else if(action==14){
        admin_Flight.updateFlightData(data.data, function(err,res){
            //console.log('after handle'+res.value[0].count);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res.value
                    }),
                    partition : 0
                }];
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
    }
    else if(action==15) {
        admin_Hotel.deleteHotelData(data.data, function (err, res) {
            console.log('after handle delete Cars---' + JSON.stringify(res));
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
    else if(action==16){
        admin_Hotel.updateHotelData(data.data, function(err,res){
            //console.log('after handle'+res.value[0].count);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res.value
                    }),
                    partition : 0
                }];
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
    }

    else if(action==20){
    	admin_Users.getUsers(data.data, function(err,res){
          //  console.log('after handle'+res.value[0].fname);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res.value
                    }),
                    partition : 0
                }];
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }

        else if(action==21){
          admin_Users.deleteUser(data.data, function(err,res){
                //console.log('after handle'+res.value[0].fname);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res.value
                        }),
                        partition : 0
                    }];
                producer.send(payloads, function(err, data){
                    console.log("Producer:-- ");
                });
                return;
            });
            }


            else if(action=22){
              admin_Users.newAdmin(data.data, function(err,res){
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
    else if(action=="doBooking"){
        bookHotels.handle_booking(data.data, function(err,res){
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

consumer_upload_avatar.on('message', function (message) {
    console.log('message received in upload avatar');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    file_utils.base64_decode(data.data.bufferdata,'./public/uploads/'+data.data.parentpath,data.data.filename,function(){
        var resData = {};
        resData.status = 201;

        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : resData
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

consumer_download_avatar.on('message', function (message) {
    console.log('message received in download avatar');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    file_utils.base64_encode('./public/uploads/'+data.data.parentpath+"/"+data.data.parentpath+'_'+data.data.filename+".jpeg",function(bufferdata){
        var resData = {};
        resData.status = 201;
        resData.image = bufferdata;

        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : resData
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

consumer_user_tracking.on('message', function (message) {
    console.log('message received in get Files');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action = data.data.action;
    console.log("ACTION-----" + data.data.action);

    user_tracking.handle_request(data.data, function (err, res) {
            console.log('after handle get Flights---');
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
});



consumer_charts.on('message', function (message) {
    console.log('message received in charts');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var type = data.data.type;
    console.log("TYPE-----" + type);


    chart.handle_Request(data.data, function (err, res) {
        console.log('after handle get chart data---');
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
});

