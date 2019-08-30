import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Dashboard from './components/dashboard/Dashboard';

function App() {
	return (
		<div className='App'>
			<Route path='/' exact component={Dashboard} />
		</div>
	);
}

export default App;
