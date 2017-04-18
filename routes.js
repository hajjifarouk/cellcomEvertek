'use strict';
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const register = require('./functions/user/register');
const login = require('./functions/user/login');
const profile = require('./functions/user/profile');
const password = require('./functions/user/password');
const config = require('./config/config.json');
/*/---------------------------------------------------
const addForm = require('./functions/form/addForm');
const addOption = require('./functions/option/addOption');
const addQcm = require('./functions/qcm/addQcm');
const addQuestion = require('./functions/question/addQuestion');
*///-----------------------------------------------------
module.exports = router => {
	router.get('/', (req, res) => res.end('Welcome to Cellcom !'));
	router.post('/authenticate', (req, res) => {
		const credentials = auth(req);
		if (!credentials) {
			res.status(400).json({ message: 'Invalid Request !' });
		} else {
			login.loginUser(credentials.name, credentials.pass)
			.then(result => {
				const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
				res.status(result.status).json({ message: result.message, token: token });
			})
			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
	router.post('/users', (req, res) => {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {
			res.status(400).json({message: 'Invalid Request !'});
		} else {
			register.registerUser(name, email, password)
			.then(result => {
				res.setHeader('Location', '/users/'+email);
				res.status(result.status).json({ message: result.message })
			})
			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
/*/--------------------------------------------------------------------------------
router.post('/forms', (req, res) => {
	const title = req.body.title;
	if (!title || !title.trim() ) {
		res.status(400).json({message: 'Invalid Request !'});
	} else {
		addForm.addForm(title)
		.then(result => {
			//res.setHeader('Location', '/forms');
			// TODO: redirection
			res.status(result.status).json({ message: result.message })
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});
//--------------------------------------------------------------------------------
router.post('/option', (req, res) => {
	if ( !text || !text.trim() || !value || !value.trim() ) {
		const text = req.body.text;
		const value = req.body.value;
		res.status(400).json({message: 'Invalid Request !'});
	} else {
		addOption.addOption(text, value, img)
		.then(result => {
			//res.setHeader('Location', '/forms/'+id);
			// TODO: redirection
			res.status(result.status).json({ message: result.message })
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});
//--------------------------------------------------------------------------------
router.post('/qcm', (req, res) => {
	if ( !body || !body.trim() || !type || !type.trim() || !multiple ||!multiple.trim() ) {
		const body = req.body.body;
		const type = req.body.type;
		const multiple = req.body.multiple;
		res.status(400).json({message: 'Invalid Request !'});
	} else {
		addQcm.addQcm(body, type, multiple)
		.then(result => {
			//res.setHeader('Location', '/forms/'+id);
			// TODO: redirection
			res.status(result.status).json({ message: result.message })
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});
//--------------------------------------------------------------------------------
router.post('/question', (req, res) => {
	if ( !body || !body.trim() || !type || !type.trim() ) {
		const body = req.body.body;
		const type = req.body.type;
		res.status(400).json({message: 'Invalid Request !'});
	} else {
		addQuestion.addQuestion(body, type)
		.then(result => {
			//res.setHeader('Location', '/forms/'+id);
			// TODO: redirection
			res.status(result.status).json({ message: result.message })
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});
*///--------------------------------------------------------------------------------

// TODO: the other methods
	router.get('/users/:id', (req,res) => {
		if (checkToken(req)) {
			profile.getProfile(req.params.id)
			.then(result => res.json(result))
			.catch(err => res.status(err.status).json({ message: err.message }));
		} else {
			res.status(401).json({ message: 'Invalid Token !' });
		}
	});
	router.put('/users/:id', (req,res) => {
		if (checkToken(req)) {
			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;
			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {
				res.status(400).json({ message: 'Invalid Request !' });
			} else {
				password.changePassword(req.params.id, oldPassword, newPassword)
				.then(result => res.status(result.status).json({ message: result.message }))
				.catch(err => res.status(err.status).json({ message: err.message }));
			}
		} else {
			res.status(401).json({ message: 'Invalid Token !' });
		}
	});
	router.post('/users/:id/password', (req,res) => {
		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;
		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {
			password.resetPasswordInit(email)
			.then(result => res.status(result.status).json({ message: result.message }))
			.catch(err => res.status(err.status).json({ message: err.message }));
		} else {
			password.resetPasswordFinish(email, token, newPassword)
			.then(result => res.status(result.status).json({ message: result.message }))
			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
	function checkToken(req) {
		const token = req.headers['x-access-token'];
		if (token) {
			try {
  				var decoded = jwt.verify(token, config.secret);
  				return decoded.message === req.params.id;
			} catch(err) {
				return false;
			}
		} else {
			return false;
		}
	}
}
