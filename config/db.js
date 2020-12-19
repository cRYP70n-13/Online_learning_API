const mongoose = require('mongoose');

const connectDB = async () => {
	const conn = await mongoose.connect(process.env.NODE_ENV == 'deployment' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/devcamper', {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true
	});

	console.log(`Mongodb is connected successfully: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;
