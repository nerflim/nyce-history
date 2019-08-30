let dailyPrice = require('../models/dailyPrice.model');

function get() {
	return dailyPrice
		.find()
		.lean()
		.then(prices => prices)
		.catch(err => 'Error: ' + err);
}

function show(req) {
	return 'show';
}

function store(req) {
	return 'store';
}

function update(req) {
	return 'update';
}

function destroy(req) {
	return 'destroy';
}

module.exports = { get, show, store, update };
