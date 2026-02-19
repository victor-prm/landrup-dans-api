const { newMessage } = require("../controllers/contact.controller");

module.exports = function (router) {
	router.post("/api/v1/messages", newMessage);
};
