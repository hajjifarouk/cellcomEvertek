'use strict';
const form = require('../../models/form');
exports.addForm = (title) =>
	new Promise((resolve,reject) => {
		const newForm = new form({
			title: title,
			questions: [{}],
			created_at: new Date()
		});
		newForm.save()
		.then(() => resolve({ status: 201, message: 'Form Added Sucessfully !' }))
		.catch(err => {
			if (err.code == 11000) {
				reject({ status: 409, message: 'Form Already Registered !' });
			} else {
				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
