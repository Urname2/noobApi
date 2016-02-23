
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');            // call express
var app        = express();                     // define our app using express
var bodyParser = require('body-parser');
var console    = require('./module/consoletxt'); // call the console text module
var mongoose   = require('mongoose');            // database connector


//models
var Noob  = require('./module/noob');
var Class = require('./module/class');
var Nerd = require('./module/nerd');


// create your own database: https://mongolab.com/
// mongodb://username:username@ds055925.mongolab.com:55925/noob
// localhost: mongodb://localhost/noob

var connectionString = 'mongodb://username:username@ds055895.mongolab.com:55895/nooby';

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

var port = process.env.PORT || 1337;        // set our port

// ROUTES FOR OUR API
// =============================================================================
require('./app/routes')(console, Noob, Class, Nerd, mongoose, app, express);

// REGISTER OUR ROUTES -------------------------------

// START THE SERVER
// =============================================================================
app.ListenInstance = app.listen(port);

console.log('API available on localhost:' + port);

// connecting to database
if(connectionString)
	mongoose.connect(connectionString); 

else
	console.log("Missing connectionString!");

// BOOTSTRAPPING
// =============================================================================

require('./app/bootstrapping')(console, Noob, Class, Nerd, mongoose);

//server avalible as a module
module.exports = app;