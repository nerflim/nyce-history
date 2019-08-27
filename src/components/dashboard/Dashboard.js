import React, { useState, useEffect, Fragment } from 'react';
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';
import Loader from './Loader';
import axios from 'axios';

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
	const [items, setItems] = useState([]);
	const [isFetched, setIsFetched] = useState(false);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/photos').then(res => {
			setItems(res.data);

			// stop loader and show table
			setIsFetched(true);
		});
	}, []);

	return (
		<Fragment>
			{isFetched ? (
				<div className='bg-gray-200 h-screen flex flex-col'>
					<Header />
					<Table list={list} />
					<Pagination items={items} />
				</div>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

export default Dashboard;
