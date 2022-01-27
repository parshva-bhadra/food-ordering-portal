var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {

    //implement unique email


    if (req.body.type === "user") {

        const email = req.body.email
        User.findOne({ email }).then(user => {
            // Check if user email exists
            if (!user) {
                Vendor.findOne({ email }).then(vendor => {
                    if (!vendor) {
                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            contact: req.body.contact,
                            age: req.body.age,
                            batch: req.body.batch,
                            password: req.body.password,
                        });

                        newUser.save()
                            .then(user => {
                                res.status(200).json(user);
                            })
                            .catch(err => {
                                res.status(400).send(err);
                            });
                    }
                    else {
                        res.send("Email already taken!");
                    }
                })
            }
            else {
                res.send("Email already taken!");
            }
        });

        // const newUser = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     contact: req.body.contact,
        //     age: req.body.age,
        //     batch: req.body.batch,
        //     password: req.body.password,
        // });

        // newUser.save()
        //     .then(user => {
        //         res.status(200).json(user);
        //     })
        //     .catch(err => {
        //         res.status(400).send(err);
        //     });
    }

    if (req.body.type === "vendor") {
        const email = req.body.email

        User.findOne({ email }).then(user => {
            // Check if user email exists
            if (!user) {
                Vendor.findOne({ email }).then(vendor => {
                    if (!vendor) {
                        const newVendor = new Vendor({
                            name: req.body.name,
                            email: req.body.email,
                            contact: req.body.contact,
                            shopname: req.body.shopname,
                            openingtime: req.body.openingtime,
                            closingtime: req.body.closingtime,
                            password: req.body.password,
                        });
                
                        newVendor.save()
                            .then(vendor => {
                                res.status(200).json(vendor);
                            })
                            .catch(err => {
                                res.status(400).send(err);
                            });
                    }
                    else {
                        res.send("Email already taken!");
                    }
                })
            }
            else {
                res.send("Email already taken!");
            }
        });

        // const newVendor = new Vendor({
        //     name: req.body.name,
        //     email: req.body.email,
        //     contact: req.body.contact,
        //     shopname: req.body.shopname,
        //     openingtime: req.body.openingtime,
        //     closingtime: req.body.closingtime,
        //     password: req.body.password,
        // });

        // newVendor.save()
        //     .then(vendor => {
        //         res.status(200).json(vendor);
        //     })
        //     .catch(err => {
        //         res.status(400).send(err);
        //     });
    }
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            Vendor.findOne({ email }).then(vendor => {
                if (!vendor) {
                    res.send("Email not found!");
                }
                else {
                    if (vendor.password === req.body.password) {
                        // localStorage.setItem(req.body.email)
                        res.send("Login Successful!");
                        return vendor;
                    }
                    else {
                        res.send("Incorrect Password!");
                    }
                }
            })
        }
        else {
            if (user.password === req.body.password) {
                // localStorage.setItem(req.body.email)
                res.send("Login Successful!");
                return user;
            }
            else {
                res.send("Incorrect Password!");
            }
        }
    });
});

module.exports = router;

