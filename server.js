var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var htmlRoutes = require('./routes/htmlRoutes')
var apiRoutes = require('./routes/apiRoutes')
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// ACCESS CSS, IMAGES, AND JS IN PUBLIC FOLDER
app.use(express.static(__dirname + '/public'));

// SET UP EXPRESS APP TO HANDLE BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//ACCESS TO HTMLROUTES.JS AND APIROUTES.JS
app.use(htmlRoutes);
app.use(apiRoutes);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  
