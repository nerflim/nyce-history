const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect to db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connected...');
});

// route
const dailyPriceRouter = require('./routes/dailyPrice');
app.use('/daily-price', dailyPriceRouter);

// listen to running port
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
