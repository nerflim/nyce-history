require('dotenv').config();

const mongoose = require('mongoose');

function connect() {
	// connect to db
	const uri = process.env.ATLAS_URI;
	mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

	const connection = mongoose.connection;

	// returns true when connected
	return new Promise((resolve, reject) => {
		connection.once('open', () => {
			resolve('connected');
		});
	});
}

module.exports = { connect };
