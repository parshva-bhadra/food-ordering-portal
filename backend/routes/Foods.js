var express = require("express");
var router = express.Router();

const Food = require("../models/Foods");

router.post("/", (req, res) => {
    Food.find((err, users) => {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/add", (req, res) => {
    const newFood = new Food({
        itemname: req.body.itemname,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        addons: req.body.addons,
        tags: req.body.tags,
        no_of_users: req.body.no_of_users,
        vendor_id: req.body.vendor_id,
    });
    newFood.save()
        .then(food => {
            res.status(200).json(food);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

router.post("/find", (req, res) => {
    const food_id =  req.body.food_id;

    Food.findById( food_id )
    .then(user => {
        // Check if user email exists
        console.log(user);
        if (!user) {
            return res.status(404).json(null);
        }
        else {
            res.json(user);
            return user;
        }
    });  
})

router.post("/update/:id", (req, res) => {

    Food.findById(req.params.id)
        .then(food => {
            food.itemname = req.body.itemname;
            food.price = req.body.price;
            food.rating = req.body.rating;
            food.type = req.body.type;
            food.addons = req.body.addons;
            food.tags = req.body.tags;        
            food.no_of_users = req.body.no_of_users;

            
            food.save()
                .then(food => {
                    console.log("updated!");
                    res.json(food);
                })
                .catch(err => { console.log(err); })
        })
        .catch(err => { console.log(err); })
})

router.delete("/delete/:id", (req, res) => {
    Food.findByIdAndDelete(req.params.id)
        .then(food => {
            console.log("deleted!");
            res.json(food);
        })
        .catch(err => { console.log(err); })
})

module.exports = router;
