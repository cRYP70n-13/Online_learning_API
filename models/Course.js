const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Plz add a course description']
	},
	description: {
		type: String,
		required: [true, 'Plz add a description']
	},
	weeks: {
		type: String,
		required: [true, 'Plz add a number of weeks']
	},
	tuition: {
		type: Number,
		required: [true, 'plz add a tuition cost']
	},
	minimumSkill: {
		type: String,
		required: [true, 'plz add a minimumSkill'],
		enum: ['beginner', 'intermidiate', 'advanced']
	},
	schoolarshipAvailable: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	bootcamp: {
		type: mongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true
	}
});

module.exports = mongoose.model('Course', courseSchema);