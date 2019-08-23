const { app, BrowserWindow, ipcMain } = require('electron');

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

	// testing communication between electron and react
	ipcMain.on('test', (e, arg) => {
		console.log(arg);
	});

	// and load the index.html of the app.
	win.loadURL('http://localhost:3000/');
	win.focus();
}

app.on('ready', createWindow);
