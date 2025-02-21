const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

require('dotenv').config();

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var FoodRouter = require("./routes/Foods");
var OrderRouter = require("./routes/Orders");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true }); 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

// mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully !");
// })

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/food", FoodRouter);
app.use("/order", OrderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
