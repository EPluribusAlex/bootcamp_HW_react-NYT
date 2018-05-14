const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	// author: {
	// 	type: String,
	// 	required: true
	// },
	// date: {
	// 	type: String,
	// 	required: true
	// },
	link: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Article", articleSchema);