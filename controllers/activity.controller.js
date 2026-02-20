const { verify } = require("jsonwebtoken");
const { sequelize } = require("../config/database");
var { Activity, Asset, User } = require("../models/models");
var saveFile = require("../services/asset");
const baseUrl = process.env.NODE_ENV === "production" ? "https://landrup-dans-api-nylt.onrender.com" : "http://localhost:4000/file-bucket";
/* console.log(baseUrl) */


async function getSingleActivity(req, res, next) {
	try {
		let activityData = await Activity.findByPk(parseInt(req.params.id), { include: [Asset, User] });
		res.json(activityData);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllActivities(req, res, next) {
	try {
		let activityData = await Activity.findAll({ include: [Asset, User] });
		res.json(activityData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleActivity(req, res, next) {
	let token = req.headers.authorization.split(" ")[1];
	let decodedToken = verify(token, process.env.JWT_SECRET);
	try {
		let file = saveFile(req.files.file);
		let asset = await Asset.create({
			url: `${baseUrl}/file-bucket/${file}`
		});
		let activityData = await Activity.create({
			name: req.fields.name,
			description: req.fields.description,
			weekday: req.fields.weekday,
			time: req.fields.time,
			maxParticipants: parseInt(req.fields.maxParticipants),
			minAge: parseInt(req.fields.minAge),
			maxAge: parseInt(req.fields.maxAge),
			instructorId: parseInt(decodedToken.data.id),
			assetId: parseInt(asset.id),
		});
		res.json(activityData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleActivity(req, res, next) {
	const id = parseInt(req.params.id);

	if (req.files.file) {
		try {
			let file = saveFile(req.files.file);
			let asset = await Asset.create({
				url: `${baseUrl}/file-bucket/${file}`
			});
			await Activity.update({ assetId: parseInt(asset.id) }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	if (req.fields.name) {
		try {
			await Activity.update({ name: req.fields.name }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	if (req.fields.description) {
		try {
			await Activity.update({ description: req.fields.description }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	if (req.fields.maxParticipants) {
		try {
			await Activity.update({ maxParticipants: parseInt(req.fields.maxParticipants) }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	if (req.fields.minAge) {
		try {
			await Activity.update({ minAge: parseInt(req.fields.minAge) }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	if (req.fields.maxAge) {
		try {
			await Activity.update({ maxAge: parseInt(req.fields.maxAge) }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	if (req.fields.weekday) {
		try {
			await Activity.update({ weekday: req.fields.weekday }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	if (req.fields.time) {
		try {
			await Activity.update({ time: req.fields.time }, { where: { id } });
		} catch (error) {
			console.error(error);
			res.status(500).end();
		}
	}

	const activity = await Activity.findByPk(id, { include: [Asset, User] });
	res.json(activity);
}

async function deleteSingleActivity(req, res, next) {
	try {
		await Activity.destroy({ where: { id: parseInt(req.params.id) } });
		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleActivity,
	getSingleActivity,
	getAllActivities,
	updateSingleActivity,
	deleteSingleActivity,
};
