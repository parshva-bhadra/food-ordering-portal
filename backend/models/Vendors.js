const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact:{
		type: String,
		required: true
	},
	shopname:{
		type: String,
		required: true
	},
	openingtime:{
		type: String,
		required: true
	},
    closingtime:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
