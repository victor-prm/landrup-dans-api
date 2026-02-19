var { DataTypes, Model } = require("sequelize");
var { sequelize } = require("../config/database");

class Activity extends Model { };
class User extends Model { };
class Asset extends Model { };
class Newsletter extends Model { };
class Contact extends Model { };
class Testimonial extends Model { };

Activity.init({
	name: DataTypes.TEXT,
	description: DataTypes.TEXT,
	weekday: DataTypes.TEXT,
	time: DataTypes.TEXT,
	maxParticipants: DataTypes.INTEGER,
	minAge: DataTypes.INTEGER,
	maxAge: DataTypes.INTEGER
}, { sequelize, modelName: "activity" });

User.init({
	username: DataTypes.TEXT,
	password: DataTypes.TEXT,
	firstname: DataTypes.TEXT,
	lastname: DataTypes.TEXT,
	age: DataTypes.INTEGER,
	role: DataTypes.TEXT
}, { sequelize, modelName: "user" });

Asset.init({
	url: DataTypes.TEXT
}, { sequelize, modelName: "asset" });

Newsletter.init({
	email: DataTypes.TEXT
}, { sequelize, modelName: "newsletter" });

Contact.init({
	name: DataTypes.TEXT,
	email: DataTypes.TEXT,
	message: DataTypes.TEXT
}, { sequelize, modelName: "contact" });

Testimonial.init({
	content: DataTypes.TEXT,
	name: DataTypes.TEXT,
	occupation: DataTypes.TEXT
}, { sequelize, modelName: "testimonial" });

User.belongsToMany(Activity, { through: "roster" });
Activity.belongsToMany(User, { through: "roster" });

Activity.belongsTo(User, { foreignKey: "instructorId" });
User.hasOne(Activity, { foreignKey: "instructorId" });

Activity.belongsTo(Asset, { foreignKey: "assetId" });
Asset.hasOne(Activity, { foreignKey: "assetId" });

sequelize.sync({ force: false })
	.then(function () {
		console.log("Tabels created");
	})
	.catch(function (error) {
		console.error(error);
	});

module.exports = {
	Activity,
	User,
	Asset,
	Newsletter,
	Contact,
	Testimonial,
};
