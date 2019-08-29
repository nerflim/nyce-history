const router = require('express').Router();
let dailyPrice = require('../models/dailyPrice.model');

// gets all the price

router.route('/').get((req, res) => {
	dailyPrice
		.find()
		.then(prices => res.json(prices))
		.catch(err => res.status(400).json('Error: ' + err));
});

// adds a price

router.route('/').post((req, res) => {
	const stock_symbol = req.body.stock_symbol;
	const stock_exchange = req.body.stock_exchange;
	const stock_price_open = parseFloat(req.body.stock_price_open);
	const stock_price_close = parseFloat(req.body.stock_price_close);
	const stock_price_low = parseFloat(req.body.stock_price_low);
	const stock_price_high = parseFloat(req.body.stock_price_high);
	const stock_price_adj_close = parseFloat(req.body.stock_price_adj_close);
	const stock_volume = parseFloat(req.body.stock_volume);
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
		.then(() => res.json(newPrice))
		.catch(err => res.status(400).json('Error: ' + err));
});

// gets a price

router.route('/:id').get((req, res) => {
	dailyPrice
		.findById(req.params.id)
		.then(price => res.json(price))
		.catch(err => res.status(400).json('Error: ' + err));
});

// updates the price

router.route('/:id').put((req, res) => {
	dailyPrice
		.findById(req.params.id)
		.then(price => {
			price.stock_symbol = req.body.stock_symbol;
			price.stock_exchange = req.body.stock_exchange;
			price.stock_price_open = parseFloat(req.body.stock_price_open);
			price.stock_price_close = parseFloat(req.body.stock_price_close);
			price.stock_price_low = parseFloat(req.body.stock_price_low);
			price.stock_price_high = parseFloat(req.body.stock_price_high);
			price.stock_price_adj_close = parseFloat(req.body.stock_price_adj_close);
			price.stock_volume = parseFloat(req.body.stock_volume);
			price.date = Date.parse(req.body.date);

			price
				.save()
				.then(() => res.json(price))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

// removes the price

router.route('/:id').delete((req, res) => {
	dailyPrice
		.findByIdAndDelete(req.params.id)
		.then(() => res.json('price deleted'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
