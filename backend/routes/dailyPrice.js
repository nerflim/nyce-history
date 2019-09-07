const router = require('express').Router();
let dailyPrice = require('../models/dailyPrice.model');

// gets all the price

router.route('/').get((req, res) => {
	if (req.query.hasOwnProperty('startdate') && req.query.hasOwnProperty('enddate')) {
		dailyPrice
			.find()
			.where('date')
			.gte(req.query.startdate)
			.lte(req.query.enddate)
			.then(prices => res.json(prices))
			.catch(err => res.status(400).json('Error: ' + err));
	} else if (req.query.hasOwnProperty('startdate') && !req.query.hasOwnProperty('enddate')) {
		dailyPrice
			.find()
			.where('date')
			.gte(req.query.startdate)
			.then(prices => res.json(prices))
			.catch(err => res.status(400).json('Error: ' + err));
	} else if (!req.query.hasOwnProperty('startdate') && req.query.hasOwnProperty('enddate')) {
		dailyPrice
			.find()
			.where('date')
			.lte(req.query.enddate)
			.then(prices => res.json(prices))
			.catch(err => res.status(400).json('Error: ' + err));
	} else {
		dailyPrice
			.find()
			.then(prices => res.json(prices))
			.catch(err => res.status(400).json('Error: ' + err));
	}
});

module.exports = router;
