const jsonwebtoken = require('jsonwebtoken');
const Config = require('./config');

const { secretKey } = Config;

const autentica = (req, res, next) => {
	let token = req.headers.authorization || '';

	if (!token) {
		next({ error: 'no token' });
	} 

	jsonwebtoken.verify(token, secretKey, (error, decoded) => {
		if (error) {
			next({ error: 'token no serveix' });
		} else {
			const { expiredAt } = decoded;
			if (expiredAt > new Date().getTime()) {
				next();
			} else {
				next({ error: 'token caducat' });
			}
		}
	});
};

const autError = (err, req, res, next) => {
	res.status(400).json(err);
};


//export { autentica, autError };
module.exports =  { autentica, autError };
