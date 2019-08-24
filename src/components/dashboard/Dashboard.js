import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';

const Dashboard = () => {
	const list = [
		{
			symbol: 'AEA',
			price_high: 4.42,
			price_low: 4.21,
			price_open: 4.42,
			price_close: 4.24,
			price_adj_close: 4.24,
			volume: 205500,
			date: '02-08-2010'
		},
		{
			symbol: 'AEA',
			price_high: 4.42,
			price_low: 4.21,
			price_open: 4.42,
			price_close: 4.24,
			price_adj_close: 4.24,
			volume: 205500,
			date: '02-08-2010'
		},
		{
			symbol: 'AEA',
			price_high: 4.42,
			price_low: 4.21,
			price_open: 4.42,
			price_close: 4.24,
			price_adj_close: 4.24,
			volume: 205500,
			date: '02-08-2010'
		},
		{
			symbol: 'AEA',
			price_high: 4.42,
			price_low: 4.21,
			price_open: 4.42,
			price_close: 4.24,
			price_adj_close: 4.24,
			volume: 205500,
			date: '02-08-2010'
		},
		{
			symbol: 'AEA',
			price_high: 4.42,
			price_low: 4.21,
			price_open: 4.42,
			price_close: 4.24,
			price_adj_close: 4.24,
			volume: 205500,
			date: '02-08-2010'
		},
		{
			symbol: 'AEA',
			price_high: 4.42,
			price_low: 4.21,
			price_open: 4.42,
			price_close: 4.24,
			price_adj_close: 4.24,
			volume: 205500,
			date: '02-08-2010'
		}
	];
	return (
		<div className='bg-gray-200 h-screen flex flex-col'>
			<Header />
			<Table list={list} />
			<Pagination />
			{/* <div>
				<Link to='/'>go back</Link>
			</div> */}
		</div>
	);
};

export default Dashboard;
