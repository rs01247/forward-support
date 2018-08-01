var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var ticket = require('./controller/ticket.controller')
var htmlRoutes = require('./routes/htmlRoutes')
var apiRoutes = require('./routes/apiRoutes')

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

// ACCESS TO TICKET.CONTROLLER.JS IN CONTROLLER
app.use(ticket);

// ACCESS TO HTMLROUTES.JS AND APIROUTES.JS
app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, function () {
    //LOGGING WHEN SERVER HAS STARTED
    console.log(`Listening on ${PORT}`);
});
