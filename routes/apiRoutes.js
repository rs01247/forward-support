var db = require("../models");
var express = require("express");
//use routers
var router = express.Router();






router.post("/api/user", function (req, res) {
    //get data from req.body 
    var data = {
        employeeName: req.body.employeeName,
        employeeDepartment: req.body.employeeDepartment,
        summary: req.body.summary,
        category: req.body.category,
        priority: req.body.ticketCategory,
        status: "open"
    }

    if (data.employeeName === "" || data.employeeDepartment === "" || data.summary === "" || data.category === "" || data.priority === "") {
        console.log("empty")
        //do something here to tell the user there is an emplty data 
        res.render("user", {
            employeeName: req.body.employeeName,
            employeeDepartment: req.body.employeeDepartment,
            summary: req.body.summary,
            category: req.body.category,
            priority: req.body.ticketCategory,
            message:"all fields should be filled"
        })
    }
    else {
        db.Ticket.create({
            employeeName: req.body.employeeName,
            summary: req.body.summary,
            employeeDepartment: req.body.employeeDepartment,
            priority: req.body.priority,
            ticketCategory: req.body.ticketCategory,
            status: "open"
        }).then(function (dbTicket) {
            res.redirect("/api/user")

        })
        // add catch error
    }
});


router.get("/api/user", function (req, res) {
    // return the tickets that are not closed from database to the user 
    db.Ticket.findAll({
        where: {
            status: "open"
            //condition to show only the user tickets not all tickets
        }
    }).then(function (dbTicket) {
        res.render("user", { Ticket: dbTicket })
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
        }).then(function (dbTicket) {
            res.json(dbTicket);
        })
})


router.get('/api/admin', function (req, res) {
    //we need to retrieve tickets for the admin who still open and related to that admin 
    res.render('admin', {
        title: 'Support Ticket System'
    })
});


// UPDATE PRIOIRTY LEVEL (ESCALATION)
router.put("api/user", function (req, res) {
    db.Ticket.update({
        priority: req.body.priority
    }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbTicket) {
            res.json(dbTicket);
        })
})







module.exports = router;