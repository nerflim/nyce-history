const { app, BrowserWindow, ipcMain } = require('electron');
const db = require('./controllers/connectDb');
const price = require('./controllers/price.controller');

function createWindow() {
	// Create the browser window.
	let win = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 1024,
		minHeight: 768,
		webPreferences: {
			nodeIntegration: true
		}
	});

	db.connect();

	// and load the index.html of the app.
	win.loadURL('http://localhost:3000/');
	win.focus();
}

// gets all the daily price
ipcMain.on('get', (e, arg) => {
	price.get().then(res => {
		e.reply('get', res.map(item => parsePrice(item)));
	});
});

// adds a new price
ipcMain.on('store', (e, arg) => {
	price.store(arg).then(res => {
		e.reply('store', parsePrice(res));
	});
});

// updates the price
ipcMain.on('update', (e, arg) => {
	console.log(arg);
	setTimeout(() => {
		e.reply('update', 'received update');
	}, 1000);
});

// parse the price data to display on client side
function parsePrice(price) {
	return {
		...price,
		_id: price._id.toString(),
		stock_symbol: price.stock_symbol.toString(),
		stock_exchange: price.stock_exchange.toString(),
		stock_price_open: parseFloat(price.stock_price_open),
		stock_price_close: parseFloat(price.stock_price_close),
		stock_price_low: parseFloat(price.stock_price_low),
		stock_price_high: parseFloat(price.stock_price_high),
		stock_price_adj_close: parseFloat(price.stock_price_adj_close),
		stock_volume: parseFloat(price.stock_volume),
		date: Date.parse(price.date)
	};
}

app.on('ready', createWindow);
