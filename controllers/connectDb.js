const mongoose = require('mongoose');

function connect() {
	// connect to db
	const ATLAS_URI = 'mongodb+srv://nycehistoryUser:nycehistory123@nycehistory-hdzap.mongodb.net/test?retryWrites=true&w=majority ';
	const uri = ATLAS_URI;
	mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

	const connection = mongoose.connection;
	return new Promise((resolve, reject) => {
		try {
			connection.once('open', () => {
				resolve('MongoDB connected...');
			});
		} catch (err) {
			reject(err);
		}
	});
}

module.exports = { connect };
