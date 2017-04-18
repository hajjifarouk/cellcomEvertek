'use strict';
const question = require('../../models/question');
exports.addQuestion = (body, type) =>
	new Promise((resolve,reject) => {
		const newQuestion = new question({
			body: body,
			type: type,
			created_at: new Date()
		});
		newQuestion.save()
		.then(() => resolve({ status: 201, message: 'Question Added Sucessfully !' }))
		.catch(err => {
			if (err.code == 11000) {
				reject({ status: 409, message: 'Question Already Registered !' });
			} else {
				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
