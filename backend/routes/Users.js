var express = require("express");
var router = express.Router();

// Load User and Vendor model
const User = require("../models/Users");
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/buyer", (req, res) => {
    User.find((err, users) => {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// GET request 
// Getting all the buyers
router.get("/vendor", (req, res) => {
    Vendor.find((err, vendors) => {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
});

router.get("/vendor/:id", (req, res) => {
    Vendor.findById(req.params.id) 
        .then(vendor => {
            res.json(vendor);
        })
});

// POST request 
// Add a user/vendor to database
router.post("/register", (req, res) => {

    if (req.body.type === "user") {
        const email = req.body.email
        User.findOne({ email }).then(user => {
            if (!user) {
                Vendor.findOne({ email }).then(vendor => {
                    if (!vendor) {
                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            contact: req.body.contact,
                            age: req.body.age,
                            batch: req.body.batch,
                            type: req.body.type,
                            password: req.body.password,
                            wallet: 500,
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
    }

    if (req.body.type === "vendor") {
        const email = req.body.email
        User.findOne({ email }).then(user => {
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
                            type: req.body.type,
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
                    return res.status(404).json(null);
                }
                else {
                    if (vendor.password === req.body.password) {
                        res.json(vendor);
                        return vendor;
                    }
                    else {
                        res.json(null);
                    }
                }
            })
        }
        else {
            if (user.password === req.body.password) {
                res.json(user);
                return user;
            }
            else {
                res.json(null);
            }
        }
    });
});

router.post("/profile", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            Vendor.findOne({ email }).then(vendor => {
                if (!vendor) {
                    return res.status(404).json(null);
                }
                else {
                    res.json(vendor);
                    return vendor;
                }
            })
        }
        else {
            res.json(user);
            return user;
        }
    });
});

// To update profile
router.post("/update/:id", (req, res) => {

    if (req.body.type == "user") {
        User.findById(req.params.id)
            .then(user => {
                user.name = req.body.name;
                user.email = req.body.email;
                user.contact = req.body.contact;
                user.batch = req.body.batch;
                user.age = req.body.age;
                user.password = req.body.password;
                user.wallet = req.body.wallet;
                user.save()
                    .then(user => {
                        console.log("updated!");
                        res.json(user);
                    })
                    .catch(err => { console.log(err); })
            })
            .catch(err => { console.log(err); })
    }
    if (req.body.type == "vendor") {
        Vendor.findById(req.params.id)
            .then(vendor => {
                vendor.name = req.body.name;
                vendor.email = req.body.email;
                vendor.contact = req.body.contact;
                vendor.shopname = req.body.shopname;
                vendor.openingtime = req.body.openingtime;
                vendor.closingtime = req.body.closingtime;
                vendor.password = req.body.password;

                vendor.save()
                    .then(vendor => {
                        console.log("updated!");
                        res.json(vendor);
                    })
                    .catch(err => { console.log(err); })
            })
            .catch(err => { console.log(err); })
    }
});

module.exports = router;
