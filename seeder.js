const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Envirement variables configuration
dotenv.config({ path: './config/config'});

// loading models
const Bootcamp = require('./models/Bootcamp');

// Connect to the db
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: true,
	useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JOSN.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);

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

		console.log('data destroyed...'.red.inverse);
		process.exit();
	} catch (error) {
		console.error(error);
	}
}

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}

module.exports = importData;