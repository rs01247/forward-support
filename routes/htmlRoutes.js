var express = require("express");

//use routers
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Welcome to Forward Support'
    })
});

router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Register Account'
    })
});


module.exports = router;