/**
 * NODE_ENV: The current node enviorment, values must be testing, development,
 *  or production
 * secret: The JWT secret to encrypt our applications jwts
 */
require("dotenv").config();
var cookieParser = require('cookie-parser')
var express = require('express');
var exphbs = require('express-handlebars');
var jwt = require('express-jwt');
var bodyParser = require('body-parser');

var htmlRoutes = require('./routes/htmlRoutes')
var apiRoutes = require('./routes/apiRoutes')
var authRoutes = require("./routes/authRoutes");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;



const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  getToken: function fromHeaderOrCookie (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      console.log("auth",req.headers.authorization.split(' ')[1]);
        return req.headers.authorization.split(' ')[1];
    }
     else if (req.cookies.token) {
       console.log("cook", req.cookies.token)
      return req.cookies.token
    }
    return null;
  }
});
// ACCESS CSS, IMAGES, AND JS IN PUBLIC FOLDER
app.use(express.static(__dirname + '/public'));

// SET UP EXPRESS APP TO HANDLE BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

// HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//ACCESS TO HTMLROUTES.JS AND APIROUTES.JS
app.use(htmlRoutes);
app.use("/auth", authRoutes);
app.use(auth);

app.use(apiRoutes);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Render 404 page for any unmatched routes
app.get("*", function (req, res) {
  res.render("404");
});
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: false}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

