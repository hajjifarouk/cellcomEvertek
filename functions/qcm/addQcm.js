'use strict';
const qcm = require('../../models/qcm');
exports.addQcm = (body, type, multiple) =>
	new Promise((resolve,reject) => {
		const newQcm = new qcm({
      body: body,
			type: type,
      multiple: multiple,
      options: [{}],
			created_at: new Date()
		});
		newQcm.save()
		.then(() => resolve({ status: 201, message: 'Qcm Added Sucessfully !' }))
		.catch(err => {
			if (err.code == 11000) {
				reject({ status: 409, message: 'Qcm Already Registered !' });
			} else {
				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
