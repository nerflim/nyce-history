const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const db = require('./controllers/connectDb');
const price = require('./controllers/price.controller');
const fs = require('fs');

function createWindow() {
	const isDev = true;

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

	// connect to database
	db.connect();

	// load the index.html of the app.
	isDev ? win.loadURL('http://localhost:3000/') : win.loadFile('./build/index.html');
	win.focus();

	// menu
	const template = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Add Price',
					click: async () => {
						win.webContents.send('addPrice');
					}
				},
				{ type: 'separator' },
				{ role: 'Quit' }
			]
		},
		{
			label: 'Help',
			submenu: [{ label: 'How to use?' }, { type: 'separator' }, { label: 'About NYSE History' }]
		}
	];

	// include devtools when development
	isDev
		? template.push({
				label: 'View',
				submenu: [
					{ role: 'reload' },
					{ role: 'forcereload' },
					{ role: 'toggledevtools' },
					{ type: 'separator' },
					{ role: 'resetzoom' },
					{ role: 'zoomin' },
					{ role: 'zoomout' },
					{ type: 'separator' },
					{ role: 'togglefullscreen' }
				]
		  })
		: null;

	// initialize menu template
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

// gets all the daily price
ipcMain.on('get', (e, arg) => {
	price.get(arg).then(res => {
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
	price.update(arg).then(res => {
		e.reply('update', parsePrice(res));
	});
});

// destroy / delete / remove the price
ipcMain.on('destroy', (e, arg) => {
	price.destroy(arg).then(res => {
		e.reply('destroy', res);
	});
});

// stores the daily prices to a file
ipcMain.on('store_prices', (e, arg) => {
	fs.writeFile('dailyPrices.json', JSON.stringify(arg), err => {
		if (err) throw err;
		fs.readFile('dailyPrices.json', 'utf8', (err2, data) => {
			if (err2) throw err;
			e.reply('store_prices', JSON.parse(data));
		});
	});
});

// get and read the stored prices file
ipcMain.on('get_store_prices', (e, arg) => {
	fs.readFile('dailyPrices.json', 'utf8', (err2, data) => {
		if (err2) throw err;
		e.reply('get_store_prices', JSON.parse(data));
	});
});

// parse the price data to display on client side
function parsePrice(price) {
	return {
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
