const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
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
	rating:{
		type: Number,
		required: true,
		min: 0,
		max: 5,
        default: 0
	},
	no_of_users:{
		type: Number,
		required: true,
		default: 0
	},
	type:{
		type: Boolean,
		required: true
	},
	addons:{
		type: [{ addon:String ,price: Number }],
		required: true
	},
	tags:{
		type: [String],
		required: true
	}
});

module.exports = Food = mongoose.model("Foods", FoodSchema);
