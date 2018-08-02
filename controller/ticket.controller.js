var db = require("../models");
var express = require("express");
//use routers
var router = express.Router();

//POST REQUEST TO SAVE A NEW SERVICE TICKET AND ADD TO DB
router.post("/api/user", function (req, res) {
    db.Ticket.create({
        employeeName: req.body.employeeName,
        summary: req.body.summary,
        employeeDepartment: req.body.employeeDepartment,
        priority: req.body.priority,
        ticketCategory: req.body.ticketCategory,
        status: req.body.status
    }).then(function (dbTicket) {
        res.json(dbTicket);
    })
});


router.get("/api/user/", function (req, res) {
    // return the tickets that are not closed from database to the user 
    db.Ticket.findAll({}).then(function (dbTicket) {
        res.json(dbTicket);
    })
});

// UPDATE STATUS LEVEL FOR SERVICE TICKET
router.put("api/user", function (req, res) {
    db.Ticket.update({
        status: req.body.status
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(dbTicket) {
        res.json(dbTicket);
    })
})

// UPDATE PRIOIRTY LEVEL (ESCALATION)
router.put("api/user", function (req, res) {
    db.Ticket.update({
        priority: req.body.priority
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(dbTicket) {
        res.json(dbTicket);
    })
})

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