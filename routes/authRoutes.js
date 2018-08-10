var models = require("../models");
var express = require("express");
var jwt = require('jsonwebtoken');
var router = express.Router();
var helpers = require("./helpers/auth.helpers");
var routeHelpers = require("./helpers/route.helper");


router.get('/logout', function (req, res) {
    //remove token from cookie (clear cookies)
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', { expires: new Date(0) });
    }
    res.redirect('/');
});



router.post("/index", function (req, res) {
    var user = {
        email: req.body.email,
        password: req.body.password
    }
    console.log("hi")
    models.User.findOne({
        where: {
            email: user.email
        }
    })
        .then(function (resp) {

            if (helpers.checkIfValidPass(resp, user.password)) {
                var expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);
                console.log(resp.role)
                res.json({
                    token: jwt.sign({
                        exp: parseInt(expiry.getTime() / 1000),
                        userID: resp.id,
                        name: resp.name,
                        role: resp.role,
                        email: resp.email,
                        scaryStuff: "OOGA BOOOGA"
                    }, process.env.JWT_SECRET)
                });
            }
            else {
                routeHelpers.sendJsonError(res, new Error("WRONG PASSWORD"), 401);
            }
        })
        .catch(function (err) {
            routeHelpers.sendJsonError(res, err);
        })
});

// Create a new example
router.post("/register", function (req, res) {
    var user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role
    }
    var salt = helpers.getSalt();

    var userInstance = {
        salt: salt,
        email: user.email,
        hash: helpers.getHash(salt, user.password),
        name: user.name,
        role: user.role
    }
    console.log(userInstance.salt, userInstance.hash);

    models.User.create(userInstance)
        .then(function (resp) {
            res.json({ message: "Creation Sucess!", id: resp.id })
        })
        .catch(function (err) {
            routeHelpers.sendJsonError(res, err);
        })
});

module.exports = router;
