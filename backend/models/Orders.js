const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
	itemname: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	vendor_id: {
		type: String,
		require: true
	},
	vendor_name: {
		type: String,
		require: true
	},
	total_price: {
		type: Number,
		require: true
	},
    user_id: {
		type: String,
		require: true
	},
	food_id: {
		type: String,
		require: true
	},
	rating:{
		type: Number,
		required: true,
		min: 0,
		max: 5,
        default: 0
	},
	current_status:{
		type: String,
		required: true,
		default: "PLACED"
	},
    quantity:{
		type: Number,
		required: true,
		default: 1
	},
	addons:{
		type: [{ addon:String ,price: Number }],
		required: true
	}},
    {
        timestamps: true,
    }
);

module.exports = Order = mongoose.model("Orders", OrderSchema);
