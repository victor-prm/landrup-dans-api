var { Newsletter } = require("../models/models");

async function newsletterSignUp(req, res, next) {
	try {
		const entry = await Newsletter.create({
			email: req.fields.email
		});
		res.status(201).json(entry);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	newsletterSignUp,
};