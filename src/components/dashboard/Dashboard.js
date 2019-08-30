import React, { useState, useEffect, Fragment } from 'react';
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';
import Loader from './Loader';
import Offline from './Offline';
const { ipcRenderer } = window.require('electron');

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
	const [prices, setPrices] = useState([]);
	const [items, setItems] = useState([]);
	const [isFetched, setIsFetched] = useState(false);
	const [active, setActive] = useState(1);
	const itemsPerPage = 10;
	const pageCount = items.length / itemsPerPage;

	const prev = () => {
		return active > 1 ? setActive(active - 1) : null;
	};

	const first = () => {
		return setActive(1);
	};

	const next = () => {
		return active < pageCount ? setActive(active + 1) : null;
	};

	const last = () => {
		return setActive(pageCount);
	};

	useEffect(() => {
		// fetch table data
		ipcRenderer.send('get', null);
	}, []);

	// returns table data
	ipcRenderer.on('get', (event, arg) => {
		setPrices(arg);
		setIsFetched(true);
	});

	return (
		<Fragment>
			{isFetched ? (
				<div className='bg-gray-200 h-screen flex flex-col'>
					{/* <Offline /> */}
					<Header />
					<Table prices={prices} />
					<Pagination
						items={items}
						pageCount={pageCount}
						first={() => first()}
						prev={() => prev()}
						next={() => next()}
						last={() => last()}
						setActive={e => setActive(e)}
						active={active}
					/>
				</div>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

export default Dashboard;
