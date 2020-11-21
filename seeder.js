const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Envirement variables configuration
dotenv.config({ path: './config/config.env'});

// loading models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');

// Connect to the db
mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// Import into DB
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
        await Course.create(courses);
        await User.create(users);

		console.log('data imported successfuly'.green.inverse);
		process.exit();
	} catch(err) {
		console.error(err);
	}
}

// DELETE the data
const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

		console.log('data destroyed...'.red.inverse);
		process.exit();
	} catch (error) {
		console.error(error);
	}
}

// Show Data
const showData = async () => {
	try {
		bootcampsData = await Bootcamp.find();
        coursesData = await Course.find();
        usersData = await User.find();

		console.log(bootcampsData);
		console.log(coursesData);
		console.log(usersData);
		process.exit();
	} catch (error) {
		console.error(error);
	}
}

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
} else if (process.argv[2] === '-s') {
	showData();
}