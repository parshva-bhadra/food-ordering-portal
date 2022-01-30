const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// Create Schema
const UserSchema = new Schema({
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
		length: 10,
		required: true
	},
	age:{
		type: String,
		required: true
	},
	batch:{
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
	},
	wallet:{
		type: Number,
		required: true,
		default: 500
	},
	fav_ids:{
		type: [String],
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
