var db = require("../models");
var express = require("express");
var jwt = require('express-jwt');
var jwtDecode = require('jwt-decode');
//use routers
var router = express.Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.post("/api/user", function (req, res) {
    //get data from req.body 
    console.log(req.body)
    var data = {
        employeeName: req.body.employeeName,
        employeeDepartment: req.body.employeeDepartment,
        summary: req.body.summary,
        category: req.body.category,
        priority: req.body.ticketCategory,
        employeeEmail:req.body.employeeEmail,
        status: "open"
        
    }
    if (data.employeeName === "" || data.employeeDepartment === "" || data.summary === "" || data.category === "" || data.priority === "" || data.employeeEmail==="") {
        console.log("empty")
        //do something here to tell the user there is an emplty data 
        res.render("user", {
            employeeName: req.body.employeeName,
            employeeDepartment: req.body.employeeDepartment,
            summary: req.body.summary,
            category: req.body.category,
            priority: req.body.ticketCategory,
            employeeEmail:req.body.employeeEmail,
            message:"all fields should be filled"
        })
    }
    else {
        db.Ticket.create({
            employeeName: req.body.employeeName,
            employeeEmail:req.body.employeeEmail,
            summary: req.body.summary,
            employeeDepartment: req.body.employeeDepartment,
            priority: req.body.priority,
            ticketCategory: req.body.ticketCategory,
            status: "open",
            isOpen:true,
            isInProgress:false

        }).then(function (dbTicket) {
            res.redirect("/api/user")

        })
        // add catch error
    }
});


router.get("/api/user", function (req, res) { 
   var name="";
   var email="";
    if(req.headers.authorization)
    {
    console.log(req.headers.authorization.split(" ")[1]);
    var decoded = jwtDecode(req.headers.authorization.split(" ")[1]);
    name=decoded.name;
    email=decoded.email;
    console.log(name)
    console.log(email)
    }
    // return the tickets that are not closed from database to the user 
    db.Ticket.findAll({
        where: 
      //  [
            {
            status: {
                [Op.or]: ["open", "completed","inProgress"]
              }
            //condition to show only the user tickets not all tickets
        }
    //     ,{employeeEmail:email}
    // ]

    }).then(function (dbTicket) {
        res.render("user", { Ticket: dbTicket,employeeName:name,employeeEmail:email })
    })
});


// UPDATE STATUS LEVEL FOR SERVICE TICKET
router.put("/api/user", function (req, res) {
    console.log(req.body.status)
    db.Ticket.update({
        status: req.body.status,
        isOpen:req.body.isOpen,
        isInProgress:req.body.isInProgress
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
    db.Ticket.findAll({
        where: {
            status: {
                [Op.or]: ["open", "inProgress"]
              }
            //condition to show only the user tickets not all tickets
        }
    }).then(function (dbTicket) {
        res.render("admin", { Ticket: dbTicket })
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