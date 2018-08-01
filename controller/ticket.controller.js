var db = require("../models");
var express = require("express");
//use routers
var router = express.Router();


router.post('/api/user', function (req, res) {
    // get the body request and added to database 


});

router.get('/api/user/', function (req, res) {
    // return the tickets that are not closed from database to the user 


});

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Support Ticket System'
    })
});

router.get('/user', function (req, res) {
    res.render('user', {
        title: 'Support Ticket System'
    })
});


router.get('/admin', function (req, res) {
    res.render('admin', {
        title: 'Support Ticket System'
    })
});


module.exports = router;