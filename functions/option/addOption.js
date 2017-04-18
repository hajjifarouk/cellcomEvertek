'use strict';
const option = require('../../models/option');
exports.addOption = (text, value, img) =>
	new Promise((resolve,reject) => {
		const newOption = new option({
			text: text,
			value: value,
      img: img,
			created_at: new Date()
		});
		newOption.save()
		.then(() => resolve({ status: 201, message: 'Option Added Sucessfully !' }))
		.catch(err => {
			if (err.code == 11000) {
				reject({ status: 409, message: 'Option Already Registered !' });
			} else {
				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
