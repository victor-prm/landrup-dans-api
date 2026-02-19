const { getAllTestimonials, createTestimonial } = require("../controllers/testimonial.controller");

module.exports = function (router) {
	router.post("/api/v1/testimonials", createTestimonial);
	router.get("/api/v1/testimonials", getAllTestimonials);
};
