import React, { useState, useEffect, Fragment } from 'react';
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';
import Loader from './Loader';
import Offline from './Offline';
import PriceForm from './PriceForm';
const { ipcRenderer } = window.require('electron');

const Dashboard = () => {
	const [prices, setPrices] = useState([]);
	const [priceType, setPriceType] = useState('');
	const [active, setActive] = useState({});
	const [items, setItems] = useState([]);
	const [isFetched, setIsFetched] = useState(false);
	const [activePage, setActivePage] = useState(1);
	const itemsPerPage = 10;
	const pageCount = items.length / itemsPerPage;

	const prev = () => {
		return activePage > 1 ? setActivePage(activePage - 1) : null;
	};

	const first = () => {
		return setActivePage(1);
	};

	const next = () => {
		return activePage < pageCount ? setActivePage(activePage + 1) : null;
	};

	const last = () => {
		return setActivePage(pageCount);
	};

	// opens the form and edits the active price
	const activeHandler = price => {
		setActive(price);
		setPriceType('edit');
	};

	// closes the form
	const closeHandler = () => {
		setPriceType('');
		setActive({});
	};

	// updates the edited price
	const editPrice = data => {
		const pricesCopy = [...prices];

		prices.map((item, index) => (item._id === data._id ? (pricesCopy[index] = data) : null));

		setPrices([...pricesCopy]);
	};

	const removePrice = data => {
		setPrices(prices.filter(price => price._id !== data));
	};

	useEffect(() => {
		// fetch table data
		fetchData().then(res => {
			setPrices(res);
			setIsFetched(true);
		});
	}, []);

	// calls server to get all the daily NYSE prices
	const fetchData = () => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get', null);
			ipcRenderer.on('get', (event, arg) => {
				resolve(arg);
			});
		});
	};

	return (
		<Fragment>
			{isFetched ? (
				<div className='bg-gray-200 h-screen flex flex-col'>
					{/* <Offline /> */}

					{priceType !== '' ? (
						<PriceForm
							close={() => closeHandler()}
							type={priceType}
							price={active}
							addPrice={data => setPrices([...prices, data])}
							editPrice={data => editPrice(data)}
							removePrice={data => removePrice(data)}
						/>
					) : null}

					<Header add={() => setPriceType('add')} />
					<Table prices={prices} edit={price => activeHandler(price)} active={active._id} />
					<Pagination
						items={items}
						pageCount={pageCount}
						first={() => first()}
						prev={() => prev()}
						next={() => next()}
						last={() => last()}
						setActive={e => setActivePage(e)}
						active={activePage}
					/>
				</div>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

export default Dashboard;
