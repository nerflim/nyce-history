const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyPriceSchema = new Schema(
	{
		stock_symbol: { type: String, required: true },
		stock_exchange: { type: String, required: true },
		stock_price_open: { type: Number, required: true },
		stock_price_close: { type: Number, required: true },
		stock_price_low: { type: Number, required: true },
		stock_price_high: { type: Number, required: true },
		stock_price_adj_close: { type: Number, required: true },
		stock_volume: { type: Number, required: true },
		date: { type: Date, required: true }
	},
	{
		timestamps: true
	}
);

const DailyPrice = mongoose.model('DailyPrice', dailyPriceSchema);

module.exports = DailyPrice;
