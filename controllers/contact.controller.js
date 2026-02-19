var { Contact } = require("../models/models");

async function newMessage(req, res, next) {
	try {
		const message = await Contact.create({
			name: req.fields.name,
			email: req.fields.email,
			message: req.fields.message
		});
		res.status(201).json(message);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	newMessage,
};