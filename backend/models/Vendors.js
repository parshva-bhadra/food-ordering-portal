const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true,
		unique: true
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
	type:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
