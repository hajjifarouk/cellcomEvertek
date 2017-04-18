'use strict';
const mongoose = require('mongoose');
const option =require('./option');
const question =require('./question');
const Schema = mongoose.Schema;
/*const qcmSchema =question.add({
  options       : [{ type: Schema.Types.ObjectId, ref: 'option' }]
});*/
// TODO: review the inheritence strategy
const qcmSchema = mongoose.Schema({
  question      : { type: Schema.Types.ObjectId, ref: 'question' },
  options       : [{ type: Schema.Types.ObjectId, ref: 'option' }],
	multiple 			: Boolean,
	created_at		: String,
	temp_password	: String,
	temp_password_time: String
});
mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost:27017/node-login');
module.exports = mongoose.model('qcm', qcmSchema);
