const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	itemname: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	Rating:{
		type: String,
		required: true,
        default: 0
	},
	type:{
		type: String,
		required: true
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
