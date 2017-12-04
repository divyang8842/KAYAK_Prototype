var assert = require('assert');
var request = require('request');
//var login = require('./login');
var http = require("http");

describe('Testing Server side of KAYAK Application', function() {

    it('should return the Search page if the url is correct', function(done) {
        http.get('http://localhost:3000/', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should return 404 page not found if the url is wrong', function(done) {
        http.get('http://localhost:3000/abc', function(res) {
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('should be able to login with correct credentials', function(done) {
        request.post('http://localhost:3004/login', {
            form : {

                username:'jay@gmail.com',
                password:'jay'
            }

        }, function(error, response, body) {
            console.log(response.statusCode);
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('should not login for incorrect credentials', function(done) {
        request.post('http://localhost:3004/login', {
            form : {
                username : 'x@yahoo.com',
                password : 'x'
            }
        }, function(error, response, body) {
            console.log(response.statusCode);
            assert.equal(201, response.statusCode);
            done();
        });
    });

    // it('should signup', function(done) {
    //     request.post('http://localhost:3004/getflights', {
    //         form : {
    //             Source:'sjc',
    //             Destination:'dubai',
    //             Depart:'2017-11-23',
    //             Return:'2017-11-24',
    //             Class:'first',
    //             Adult:'0'
    //             // credentials: true
    //         }
    //     }, function(error, response, body) {
    //         console.log(response.statusCode);
    //         assert.equal(201, response.statusCode);
    //         done();
    //     });
    // });

    it('Should return 501 if user is not logged in while flight booking', function(done) {
        request.post('http://localhost:3004/flightsbooking', function(error, response, body) {
            console.log(response.statusCode);
            assert.equal(501, response.statusCode);
            done();
        });
    });

    it('Should return 501 if user is not logged in while Car booking', function(done) {
        request.post('http://localhost:3004/carsbooking'
        , function(error, response, body) {
            console.log(response.statusCode);
            assert.equal(501, response.statusCode);
            done();
        });
    });

    it('Should return 501 if user is not logged in while Hotel booking', function(done) {
        request.post('http://localhost:3004/doHotelBooking', function(error, response, body) {
            console.log(response.statusCode);
            assert.equal(501, response.statusCode);
            done();
        });
    });

    it('should allow user to do booking if he is logged in', function(done) {
        request.post('http://localhost:3004/login', {
            form : {

                username:'jay3@gmail.com',
                password:'jay'
            }

        }, function(error, response, body) {


                request.post('http://localhost:3004/doHotelBooking', {

                    credentials:'include'

                }, function(error, response, body) {
                    console.log(response.statusCode);
                    assert.equal(201, response.statusCode);
                    done();
                });
            });

            done();
        });


    it('should not allow normal user to  access admin modules', function(done) {
        request.post('http://localhost:3004/login', {
            form : {

                username:'jay3@gmail.com',
                password:'jay'
            }

        }, function(error, response, body) {


            request.post('http://localhost:3004/listhotels', {

                credentials:'include'

            }, function(error, response, body) {
                console.log(response.statusCode);
                assert.equal(501, response.statusCode);
                done();
            });
        });

        done();
    });

    it('should allow admin user to  access admin modules', function(done) {
        request.post('http://localhost:3004/login', {
            form : {

                username:'jay@gmail.com',
                password:'jay'
            }

        }, function(error, response, body) {


            request.post('http://localhost:3004/listhotels', {

                credentials:'include'

            }, function(error, response, body) {
                console.log(response.statusCode);
                assert.equal(501, response.statusCode);
                done();
            });
        });

        done();
    });
});