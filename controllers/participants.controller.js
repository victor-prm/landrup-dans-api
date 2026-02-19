var { Activity, User, Asset } = require("../models/models");

async function getParticipantsByActivity(req, res, next) {
	try {
		let participantsData = await Activity.findByPk(parseInt(req.params.id), { include: [Asset, User] });
		return res.json(participantsData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function getActivitiesByUser(req, res, next) {
	try {
		let userData = await User.findByPk(parseInt(req.params.id), { include: [Activity] });
		return res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	getParticipantsByActivity,
	getActivitiesByUser
};