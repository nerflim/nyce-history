import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Dashboard from './components/dashboard/Dashboard';

const { ipcRenderer } = window.require('electron');

function App() {
	const clickHandler = () => {
		ipcRenderer.send('test', 'click triggered!');
	};

	return (
		<div className='App'>
			<Route path='/' exact component={Dashboard} />
			{/* <button type='button' onClick={() => clickHandler()}>
				Click me!
			</button> */}
		</div>
	);
}

export default App;
