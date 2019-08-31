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
	const newPrice = new dailyPrice({
		stock_symbol: req.stock_symbol,
		stock_exchange: 'NYSE',
		stock_price_open: parseFloat(req.stock_price_open),
		stock_price_close: parseFloat(req.stock_price_close),
		stock_price_low: parseFloat(req.stock_price_low),
		stock_price_high: parseFloat(req.stock_price_high),
		stock_price_adj_close: parseFloat(req.stock_price_adj_close),
		stock_volume: parseFloat(req.stock_volume),
		date: Date.parse(req.date)
	});

	return newPrice
		.save()
		.then(() => newPrice)
		.catch(err => 'Error: ' + err);
}

function update(req) {
	return dailyPrice
		.findById(req._id)
		.then(price => {
			price.stock_symbol = req.stock_symbol;
			price.stock_exchange = req.stock_exchange;
			price.stock_price_open = parseFloat(req.stock_price_open);
			price.stock_price_close = parseFloat(req.stock_price_close);
			price.stock_price_low = parseFloat(req.stock_price_low);
			price.stock_price_high = parseFloat(req.stock_price_high);
			price.stock_price_adj_close = parseFloat(req.stock_price_adj_close);
			price.stock_volume = parseFloat(req.stock_volume);
			price.date = Date.parse(req.date);

			return price
				.save()
				.then(() => price)
				.catch(err => 'Error: ' + err);
		})
		.catch(err => 'Error: ' + err);
}

function destroy(req) {
	return 'destroy';
}

module.exports = { get, show, store, update };
