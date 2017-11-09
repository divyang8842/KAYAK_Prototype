var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./routes/passport')(passport);
var cors = require('cors');

var adminHotel = require('./routes/admin/hotel');
var getFlights = require('./routes/Flights/GetFlights');

var signup = require('./routes/signup');


var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

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
app.post('/setHotelData',adminHotel.setHotelData);
app.post('/getflights',getFlights.getFLights);

app.post('/logout', function(req,res) {
    console.log(req.session.user);

    req.session.destroy();
    console.log('Session Destroyed');
    res.status(201).json({status:201});
});

app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        if(!user) {
        	console.log("CHECK: "+ user);
        	res.status(201).json({output:0});
        }
        else{
        req.session.user = user;
        //console.log("Session initialised: "+req.session.user);
        //req.session.save();
        res.status(201).send({output:user});}

    })(req, res);
});

module.exports = app;
