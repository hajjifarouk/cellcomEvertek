'use strict';
const mongoose = require('mongoose');
const question =require('./question');
const Schema = mongoose.Schema;
const formSchema = mongoose.Schema({
	title 				: String,
	question 			:[{ type: Schema.Types.ObjectId, ref: 'question' }],
	created_at		: String
});
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost:27017/node-login/forms');
module.exports = mongoose.model('form', formSchema);
