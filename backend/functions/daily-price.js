const connectDb = require('../connectDb');
let dailyPrice = require('../models/dailyPrice.model');

exports.handler = function(event, context, callback) {
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

	// Call DB
	const getPrices = () => {
		connectDb.connect().then(res => (res ? getPricesHandler() : send('Cannot connect to the database...')));
	};

	// call request
	const getPricesHandler = () => {
		dailyPrice
			.find()
			.limit(10)
			.then(res => send(res))
			.catch(err => send('Error: ' + err));
	};

	// make sure method is GET
	if (event.httpMethod === 'GET') {
		// getPrices();
		send({ test: 'asdf' });
	}
};
