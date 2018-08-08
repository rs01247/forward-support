var express = require("express");
//use routers
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Support Ticket System'
    })
});

router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Support Ticket System'
    })
});



module.exports = router;