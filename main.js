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

ipcMain.on('fetchData', (e, arg) => {
	console.log('fetching data');
	price.get().then(res => {
		e.reply('dataFetched', res);
	});
});

app.on('ready', createWindow);
