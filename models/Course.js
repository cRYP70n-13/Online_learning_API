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
		enum: ['beginner', 'intermediate', 'advanced']
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

// static method to get average of course tuitions
courseSchema.statics.getAverageCost = async function (bootcampId) {
	console.log('calculating average cost...'.blue);

	const obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId }
		},
		{
			$group: {
				_id: '$bootcamp',
				averageCost: { $avg: '$tuition' }
			}
		}
	]);

	try {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageCost: Math.ceil(obj[0].averageCost / 10) * 10
		})
	} catch (error) {
		console.error(error);
	}
	console.log(obj);
}

// call GetAverageCost after save
courseSchema.post('save', async function(){
	this.constructor.getAverageCost(this.bootcamp);
});

// call GetAverageCost after remove
courseSchema.pre('remove', async function () {
	this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', courseSchema);