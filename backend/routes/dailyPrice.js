const router = require('express').Router();
let dailyPrice = require('../models/dailyPrice.model');

router.route('/').get((req, res) => {
	dailyPrice
		.find()
		.then(prices => res.json(prices))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
	const stock_symbol = req.body.stock_symbol;
	const stock_exchange = req.body.stock_exchange;
	const stock_price_open = Number(req.body.stock_price_open);
	const stock_price_close = Number(req.body.stock_price_close);
	const stock_price_low = Number(req.body.stock_price_low);
	const stock_price_high = Number(req.body.stock_price_high);
	const stock_price_adj_close = Number(req.body.stock_price_adj_close);
	const stock_volume = Number(req.body.stock_volume);
	const date = Date.parse(req.body.date);

	const newPrice = new dailyPrice({
		stock_symbol,
		stock_exchange,
		stock_price_open,
		stock_price_close,
		stock_price_low,
		stock_price_high,
		stock_price_adj_close,
		stock_volume,
		date
	});

	newPrice
		.save()
		.then(() => res.json('res'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
