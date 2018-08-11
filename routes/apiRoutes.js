var db = require("../models");
var express = require("express");
var jwtDecode = require('jwt-decode');
var Sequelize = require('sequelize');
var sgMail = require('@sendgrid/mail');
var emailer = require('./helpers/email.helpers')

var Op = Sequelize.Op;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//use routers
var router = express.Router();


router.post("/api/user", function (req, res) {
    //get data from req.body 
    console.log(req.body)
    var data = {
        employeeName: req.body.employeeName,
        employeeDepartment: req.body.employeeDepartment,
        summary: req.body.summary,
        category: req.body.category,
        priority: req.body.ticketCategory,
        employeeEmail: req.body.employeeEmail,
        status: "open"

    }
    if (data.employeeName === "" || data.employeeDepartment === "" || data.summary === "" || data.category === "" || data.priority === "" || data.employeeEmail === "") {
        console.log("empty")
        //do something here to tell the user there is an emplty data 
        res.render("user", {
            employeeName: req.body.employeeName,
            employeeDepartment: req.body.employeeDepartment,
            summary: req.body.summary,
            category: req.body.category,
            priority: req.body.ticketCategory,
            employeeEmail: req.body.employeeEmail,
            message: "all fields should be filled"
        })
    }
    else {
        db.Ticket.create({
            employeeName: req.body.employeeName,
            employeeEmail: req.body.employeeEmail,
            summary: req.body.summary,
            employeeDepartment: req.body.employeeDepartment,
            priority: req.body.priority,
            ticketCategory: req.body.ticketCategory,
            status: "open",
            isOpen: true,
            isInProgress: false

            //send email from the system to the admin 
        }).then(function (dbTicket) {
            sgMail.send(emailer.openMail)
                .then(function () {
                    console.log("done");
                })
                .catch(function (err) {
                    console.error(err);
                })
            res.redirect("/api/user")

        })
        // add catch error
    }
});

var name = "";
var email = "";


router.get("/api/user", function (req, res) {
 console.log("cccccccccccccccccccccccccc"+req.cookies.token);
    // if (req.headers.authorization) {
    //     console.log(req.headers.authorization.split(" ")[1]);
        var decoded = jwtDecode(req.cookies.token);
        name = decoded.name;
        email = decoded.email;
        console.log(name)
        console.log(email)
   // }
    // return the tickets that are not closed from database to the user 
    db.Ticket.findAll({
        where:
            [
                {
                    status: {
                        [Op.or]: ["open", "completed", "inProgress"]
                    }
                    //condition to show only the user tickets not all tickets
                }
                , {
                    employeeEmail: email
                }
            ]

    }).then(function (dbTicket) {
        res.render("user", { 
            Ticket: dbTicket, 
            employeeName: name, 
            employeeEmail: email,
            title: `${name}'s Tickets`
        })
    })
});


// UPDATE STATUS LEVEL FOR SERVICE TICKET
router.put("/api/user", function (req, res) {

    db.Ticket.update({
        status: req.body.status,
        isOpen: req.body.isOpen,
        isInProgress: req.body.isInProgress
    }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbTicket) {
            console.log(req.body.status)
            console.log(req.body.email)
            res.json(dbTicket);

            if (req.body.status === "inProgress") {
                emailer.inProgressMail.to = req.body.email;
                sgMail.send(emailer.inProgressMail)
                    .then(function () {
                        console.log("done");
                    })
                    .catch(function (err) {
                        console.error(err);
                    })
            }
            else if (req.body.status === "completed") {
                emailer.completeMail.to = req.body.email;
                sgMail.send(emailer.completeMail)
                    .then(function () {
                        console.log("done");
                    })
                    .catch(function (err) {
                        console.error(err);
                    })
            }
            else if (req.body.status === "close") {
                emailer.closeMail.to = req.body.email;
                sgMail.send(emailer.closeMail)
                    .then(function () {
                        console.log("done");
                    })
                    .catch(function (err) {
                        console.error(err);
                    })
            }
        })
});


router.get('/api/admin', function (req, res) {
    //we need to retrieve tickets for the admin who still open and related to that admin 
    var kind=jwtDecode(req.cookies.token).role.split(" ")[0];
    var name=jwtDecode(req.cookies.token).name;
    var role =jwtDecode(req.cookies.token).role;
    db.Ticket.findAll({
        where: [{
            status: {
                [Op.or]: ["open", "inProgress"]
            }
            //condition to show only the user tickets not all tickets
        },
        {
            ticketCategory : kind
        }
    ]
    }).then(function (dbTicket) {
        res.render("admin", { 
            Ticket: dbTicket,
            ticket: 'Admin Page',
            name:name,
            role:role

        })
    })
});


// UPDATE PRIOIRTY LEVEL (ESCALATION)
// router.put("api/user", function (req, res) {
//     db.Ticket.update({
//         priority: req.body.priority
//     }, {
//             where: {
//                 id: req.body.id
//             }
//         }).then(function (dbTicket) {
//             res.json(dbTicket);
//         })
// });




module.exports = router;