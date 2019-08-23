const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
	// Create the browser window.
	let win = new BrowserWindow({
		width: 800,
		height: 600,
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
}

app.on('ready', createWindow);
