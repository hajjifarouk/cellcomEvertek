'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const optionSchema = mongoose.Schema({
	text 			: String,
	value			: String,
	created_at		: String,
	temp_password	: String,
	temp_password_time: String
});
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost:27017/node-login/options');
module.exports = mongoose.model('option', optionSchema);
