'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = mongoose.Schema({
	body 			: String,
	type			: String,
	created_at		: String,
	temp_password	: String,
	temp_password_time: String
});
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost:27017/node-login/questions');
module.exports = mongoose.model('question', questionSchema);
