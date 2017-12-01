var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./routes/passport')(passport);
var cors = require('cors');

var adminHotel = require('./routes/admin/hotel');
var adminCar = require('./routes/admin/car');
var adminUsers=require('./routes/admin/users');
var adminBookings=require('./routes/admin/bookings');

var getFlights = require('./routes/Flights/GetFlights');
var flightsBooking = require('./routes/Flights/FlightBooking');
var getCars =require('./routes/Cars/GetCars');
var carsbooking =require('./routes/Cars/CarBooking');
var hotels = require('./routes/hotels/hotels');
var adminFlight=require('./routes/admin/flight');

var adminCharts=require('./routes/admin/ChartsData');


var security=require('./routes/utils/security');


var userTracking = require('./routes/UserTracking/UserTracking');

var signup = require('./routes/signup');
var account = require('./routes/account');
var checkuser = require('./routes/checkuser');

var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var uploadFile=require('./routes/fileoperations/uploadfile');
var downloadFile=require('./routes/fileoperations/downloadFiles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "KAYAK_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

/*app.use('/', routes);
app.use('/users', users);*/
app.use('/signup', signup.signup);
app.use('/checkuser', checkuser.checkuser);
app.use('/account',security.authenticate, account.account);
app.use('/update', security.authenticate,account.update);
app.use('/password',security.authenticate, account.password);
app.use('/listrooms',security.authenticateAdmin, adminHotel.getHotelRooms);
app.use('/updateroom',security.authenticateAdmin, adminHotel.updateRoom);
app.use('/deleteroom',security.authenticateAdmin, adminHotel.deleteRoom);
app.post('/setHotelData',security.authenticateAdmin,adminHotel.setHotelData);
app.post('/setRoomData',security.authenticateAdmin,adminHotel.setRoomData);
app.post('/setCarData',security.authenticateAdmin,adminCar.setCarData);
app.post('/setFlightData',security.authenticateAdmin,adminFlight.setFlightData);

app.post('/listusers',security.authenticateAdmin,adminUsers.getUsers);
app.post('/deleteuser',security.authenticateAdmin,adminUsers.deleteUser);
app.post('/newadmin',security.authenticateAdmin,adminUsers.newAdmin);

app.post('/getflights',getFlights.getFLights);
app.post('/getHotels',hotels.getHotels);
app.post('/getcars',getCars.getCars);

app.post('/deleteCar',security.authenticateAdmin,adminCar.deleteCar);
app.post('/updatecar',security.authenticateAdmin,adminCar.updateCar);
app.post('/deleteFlight',security.authenticateAdmin,adminFlight.deleteFlight);
app.post('/updateflight',security.authenticateAdmin,adminFlight.updateFlight);
app.post('/updatehotel',security.authenticateAdmin,adminHotel.updateHotel);


app.post('/flightsbooking',flightsBooking.fLightsBooking);
app.post('/carsbooking',carsbooking.carsbooking);
app.post('/usertracking',userTracking.usertracking);
app.post('/doHotelBooking',hotels.doBooking);

app.post('/uploadFile',security.authenticate,uploadFile);
// app.post('/getFile',security.authenticate,downloadFile.fileDownload);
app.post('/getFile',downloadFile.fileDownload);

app.post('/listhotels',security.authenticateAdmin,adminHotel.getHotelData);
app.post('/listCarsData',security.authenticateAdmin,adminCar.getCarData);
app.post('/listFlightsData',security.authenticateAdmin,adminFlight.getFlightData);
app.post('/getChartsData',security.authenticateAdmin,adminCharts.getChartData);

app.post('/getHotelBookings',security.authenticateAdmin,adminBookings.getHotelBookings);
app.post('/getFlightBookings',security.authenticateAdmin,adminBookings.getFlightBookings);
app.post('/getCarBookings',security.authenticateAdmin,adminBookings.getCarBookings);

app.post('/validateLogin',security.getLoggedInInfoFromSession);




app.post('/logout', function(req,res) {
    //req.body.path
    //req.pagename
    //req.time
    console.log(req.session.user);
req.session.user=undefined;
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(201).json({status:201});

});

app.post('/login',function(req, res) {
    passport.authenticate('login', function(err, user) {
     // console.log("USER: "+user);
        if(!user) {
        	console.log("CHECK: "+ user);
        	res.status(201).json({output:0});
        }
        else{
        req.session.user = user;
        req.session.save();
        res.status(201).send({output:user});}

    })(req, res);
});

module.exports = app;
