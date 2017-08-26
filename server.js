// *************************************************************
// *** Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Static directory
app.use(express.static("public"));

// Override with POST having ?_method=PUT
app.use(methodOverride('_method'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them
require('./controllers/burgers_controller.js')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("sequelizedburger listening on PORT " + PORT);
  });
});
