var { createSingleActivity, getSingleActivity, getAllActivities, updateSingleActivity, deleteSingleActivity } = require("../controllers/activity.controller");
var { isAuthorized, isInstructor } = require("../middleware/auth");

module.exports = function (router) {
	router.post("/api/v1/activities", isAuthorized, isInstructor, createSingleActivity);
	router.get("/api/v1/activities/:id", getSingleActivity);
	router.get("/api/v1/activities", getAllActivities);
	router.patch("/api/v1/activities/:id", isAuthorized, isInstructor, updateSingleActivity);
	router.delete("/api/v1/activities/:id", isAuthorized, isInstructor, deleteSingleActivity);
};
