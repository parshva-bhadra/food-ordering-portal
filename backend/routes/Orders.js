var express = require("express");
const Foods = require("../models/Foods");
var router = express.Router();

const Order = require("../models/Orders");
const User = require("../models/Users");
const Vendor = require("../models/Vendors");

router.get("/", (req, res) => {
    Order.find((err, order) => {
        if (err) {
            console.log(err);
        } else {
            res.json(order);
        }
    })
});

router.get("/user/:id", (req, res) => {

    const user_id = {
        user_id: req.params.id,
    }

    Order.find(user_id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json("Error: " + err))
})

router.get("/vendor/:id", (req, res) => {

    const vendor_id = {
        vendor_id: req.params.id,
    }

    Order.find(vendor_id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/add", (req, res) => {
    
    const newOrder = new Order({
        itemname: req.body.itemname,
        price: req.body.price,
        vendor_id: req.body.vendor_id,
        user_id: req.body.user_id,
        rating: req.body.rating,
        addons: req.body.addons,
        quantity: req.body.quantity,
        food_id: req.body.food_id,
    });

    const id = req.body.user_id;

    Vendor.findById(req.body.vendor_id)
        .then(vendor => {
            newOrder.vendor_name = vendor.name;
        })

    User.findById(id)
        .then(user => {
            console.log(newOrder.price);
            console.log(user.wallet);

            let temp = 0;
            for (let i = 0; newOrder.addons[i] != null; i++) {
                temp = temp + newOrder.addons[i].price;
            }
            console.log(temp);
            const total_price = newOrder.price + temp;
            newOrder.total_price = total_price*req.body.quantity;
            if (user.wallet >= (req.body.quantity * total_price)) {
                newOrder.save()
                    .then(order => {
                        res.status(200).json(order.data);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });

                const wallet_new = user.wallet - (req.body.quantity * total_price);
                user.wallet = wallet_new;

                user.save()
                    .then(user => {
                        console.log("updated!");
                        res.json(user);
                    })
                    .catch(err => { console.log(err); })
            } else {
                res.json("Insufficient Amount in Wallet!")
            }

            console.log(user)
        })

})

router.post("/vendor/reject/:id", (req, res) => {
    const order_id = req.params.id;
    // console.log(user_id);
    console.log(order_id);

    Order.findById(order_id)
        .then(order => {
            // food.itemname = req.body.itemname;
            // food.price = req.body.price;
            // food.vendor_id = req.body.vendor_id;
            // food.user_id = req.body.user_id;
            // food.rating = req.body.rating;
            // food.current_status = "CANCELLED";
            // food.addons = req.body.addons;
            // food.quantity = req.body.quantity;

            // food.save()
            //     .then(food => {
            //         console.log("updated!");
            //         res.json(food);
            //     })
            //     .catch(err => { console.log(err); })
            const user_id = order.user_id;

            console.log(order);
            if (order.current_status == "PLACED") {
                User.findById(user_id)
                    .then(user => {
                        console.log(user.wallet);

                        let temp = 0;
                        for (let i = 0; order.addons[i] != null; i++) {
                            temp = temp + order.addons[i].price;
                        }
                        console.log(temp);
                        const total_price = order.price + temp;

                        const wallet_new = user.wallet + (order.quantity * total_price);
                        user.wallet = wallet_new;

                        user.save()
                            .then(user => {
                                console.log("updated!");
                                res.json(user);
                            })
                            .catch(err => { console.log(err); })

                        console.log(user)

                        order.current_status = "REJECTED";
                        order.save()
                            .then(food => {
                                console.log("updated!");
                                res.json(order);
                            })
                            .catch(err => { console.log(err); })

                        console.log(order)
                    })
            } else if (order.current_status == "REJECTED") {
                res.json("Already rejected!");
            }
            else {
                res.json("Order cannot be cancelled at this stage!");
            }
        })
})

router.post("/user/cancel/:id", (req, res) => {
    const order_id = req.params.id;
    // console.log(user_id);
    console.log(order_id);

    Order.findById(order_id)
        .then(order => {
            // food.itemname = req.body.itemname;
            // food.price = req.body.price;
            // food.vendor_id = req.body.vendor_id;
            // food.user_id = req.body.user_id;
            // food.rating = req.body.rating;
            // food.current_status = "CANCELLED";
            // food.addons = req.body.addons;
            // food.quantity = req.body.quantity;

            // food.save()
            //     .then(food => {
            //         console.log("updated!");
            //         res.json(food);
            //     })
            //     .catch(err => { console.log(err); })
            const user_id = order.user_id;
            console.log(order);
            if (order.current_status == "PLACED") {
                Order.findByIdAndDelete(order_id)
                    .then(() => {
                        User.findById(user_id)
                            .then(user => {
                                console.log(user.wallet);

                                let temp = 0;
                                for (let i = 0; order.addons[i] != null; i++) {
                                    temp = temp + order.addons[i].price;
                                }
                                console.log(temp);
                                const total_price = order.price + temp;

                                const wallet_new = user.wallet + (order.quantity * total_price);
                                user.wallet = wallet_new;

                                user.save()
                                    .then(user => {
                                        console.log("updated!");
                                        res.json(user);
                                    })
                                    .catch(err => { console.log(err); })

                                console.log(user)

                                order.current_status = "CANCELLED";
                                order.save()
                                    .then(food => {
                                        console.log("updated!");
                                        res.json(order);
                                    })
                                    .catch(err => { console.log(err); })

                                console.log(order)
                            })
                    })
            } else if (order.current_status == "CANCELLED") {
                res.json("Already cancelled!");
            }
            else {
                res.json("Order cannot be cancelled at this stage!");
            }
        })
})

router.post("/user/update/:id", (req, res) => {
    const order_id = req.params.id;
    console.log(order_id);

    Order.findById(order_id)
        .then(order => {
            const user_id = order.user_id;

            // food.itemname = req.body.itemname;
            // food.price = req.body.price;
            // food.vendor_id = req.body.vendor_id;
            // food.user_id = req.body.user_id;
            // food.rating = req.body.rating;
            // food.current_status = "CANCELLED";
            // food.addons = req.body.addons;
            // food.quantity = req.body.quantity;

            // food.save()
            //     .then(food => {
            //         console.log("updated!");
            //         res.json(food);
            //     })
            //     .catch(err => { console.log(err); })
            console.log(order);
            res.json(order);
            if (order.current_status == "PLACED") {
                User.findById(user_id)
                    .then(user => {
                        console.log(order.price);
                        console.log(user.wallet);

                        let temp = 0;
                        for (let i = 0; order.addons[i] != null; i++) {
                            temp = temp + order.addons[i].price;
                        }
                        console.log(temp);
                        let total_price = order.price + temp;
                        total_price = order.quantity * total_price;
                        user.wallet = user.wallet + total_price;

                        let temp2 = 0;
                        for (let i = 0; req.body.addons[i] != null; i++) {
                            temp2 = temp2 + req.body.addons[i].price;
                        }
                        console.log(temp2);
                        total_price = req.body.price + temp2;
                        total_price = req.body.quantity * total_price;
                        order.total_price = total_price;
                        if (user.wallet >= total_price) {
                            user.wallet = user.wallet - total_price;

                            user.save()
                                .then(user => {
                                    console.log("updated!");
                                    res.json(user);
                                })
                                .catch(err => { console.log(err); })

                            console.log(user)


                            order.quantity = req.body.quantity;
                            order.itemname = req.body.itemname;
                            order.addons = req.body.addons;
                            order.price = req.body.price;
                            order.vendor_id = req.body.vendor_id;

                            order.save()
                                .then(order => {
                                    console.log("updated!");
                                    res.json(order);
                                })
                                .catch(err => { console.log(err); })

                            console.log(order)
                        } else {
                            res.json("Not enough money to update!");
                        }
                    })
            } else {
                res.json("Order cannot be updated at this stage!");
            }
        })
})

router.post("/vendor/update/:id", (req, res) => {

    Order.findById(req.params.id)
        .then(order => {
            order.current_status = req.body.status,
                console.log(order.status);
            order.save()
                .then(() => res.json("Status of order has been updated"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/user/pickup/:id", (req, res) => {

    Order.findById(req.params.id)
        .then(order => {
            order.current_status = req.body.status;
                console.log(order.status);
            order.save()
                .then(() => res.json("Order Completed!"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/user/rate/:id", (req, res) => {

    Order.findById(req.params.id)
        .then(order => {
            if (order.rating == 0){
            order.rating = req.body.rating,
                console.log(order.status);

            Foods.findById(order.food_id)
                .then(food => {
                    food.rating = (order.rating * order.quantity + food.rating * food.no_of_users) / (food.no_of_users + order.quantity);
                    food.no_of_users = food.no_of_users + order.quantity;

                    food.save()
                        .then(() => res.json("Rating Updated!"))
                        .catch(err => res.status(400).json("Error: " + err))
                })
            order.save()
                .then(() => res.json("Order Rating Updated!"))
                .catch(err => res.status(400).json("Error: " + err))
            }
            else{
                res.json("Already rated!")
            }
        })
        .catch(err => res.status(400).json("Error: " + err))
})


router.delete("/delete/:id", (req, res) => {

    Order.findByIdAndDelete(req.params.id)
        .then(res => res.json("Deleted Order " + res.data))
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;
