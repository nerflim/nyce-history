import React from 'react';
import './App.css';

const { ipcRenderer } = window.require('electron');

function App() {
	const clickHandler = () => {
		ipcRenderer.send('test', 'click triggered!');
	};

	return (
		<div className='App'>
			<button type='button' onClick={() => clickHandler()}>
				Click me!
			</button>
		</div>
	);
}

export default App;
