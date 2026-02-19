var { Testimonial } = require("../models/models");

async function getAllTestimonials(req, res, next) {
	try {
		const testimonials = await Testimonial.findAll();
		res.json(testimonials);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createTestimonial(req, res, next) {
	try {
		const testmonial = await Testimonial.create({
			name: req.fields.name,
			content: req.fields.content,
			occupation: req.fields.occupation
		});
		res.status(201).json(testmonial);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createTestimonial,
	getAllTestimonials,
};