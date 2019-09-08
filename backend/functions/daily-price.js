require('dotenv').config();
const mongoose = require('mongoose');
let dailyPrice = require('../models/dailyPrice.model');

exports.handler = function(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;

	// Send user response
	const send = body => {
		callback(null, {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
	};

	// connect to db
	function connect() {
		const uri = process.env.ATLAS_URI;
		mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, bufferCommands: false, bufferMaxEntries: 0 });

		const connection = mongoose.connection;
		// returns true when connected
		return new Promise((resolve, reject) => {
			connection.once('open', () => {
				resolve(true);
			});
		});
	}

	// Call DB
	const getPrices = () => {
		connect().then(res => (res ? getPricesHandler() : send('Cannot connect to the database...')));
	};

	// call request
	const getPricesHandler = () => {
		if (event.queryStringParameters.startdate !== undefined && event.queryStringParameters.enddate !== undefined) {
			dailyPrice
				.find()
				.where('date')
				.gte(event.queryStringParameters.startdate)
				.lte(event.queryStringParameters.enddate)
				.then(prices => send(prices))
				.catch(err => send('Error: ' + err));
		} else if (event.queryStringParameters.startdate !== undefined && event.queryStringParameters.enddate === undefined) {
			dailyPrice
				.find()
				.where('date')
				.gte(event.queryStringParameters.startdate)
				.then(prices => send(prices))
				.catch(err => send('Error: ' + err));
		} else if (event.queryStringParameters.startdate === undefined && event.queryStringParameters.enddate !== undefined) {
			dailyPrice
				.find()
				.where('date')
				.lte(event.queryStringParameters.enddate)
				.then(prices => send(prices))
				.catch(err => send('Error: ' + err));
		} else {
			dailyPrice
				.find()
				.then(prices => send(prices))
				.catch(err => send('Error: ' + err));
		}
	};

	// make sure method is GET
	if (event.httpMethod === 'GET') {
		getPrices();
	}
};
