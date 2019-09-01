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
	const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

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

	// only runs once
	useEffect(() => {
		// fetch table data
		fetchData().then(res => {
			setPrices(res);
			setIsFetched(true);
		});
	}, []);

	// everytime the prices are changed, the stored prices file will also update
	useEffect(() => {
		storePrices();
	}, [prices]);

	useEffect(() => {
		// event listener to check if there is internet connection
		window.addEventListener('online', checkOnlineStatus);
		window.addEventListener('offline', checkOnlineStatus);

		checkOnlineStatus();

		// remove event listeners to avoid memory leak
		return () => {
			window.removeEventListener('online', checkOnlineStatus);
			window.removeEventListener('offline', checkOnlineStatus);
		};
	});

	// calls server to get all the daily NYSE prices
	const fetchData = () => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get', null);
			ipcRenderer.on('get', (event, arg) => {
				resolve(arg);
			});
		});
	};

	// calls the server to store the daily prices to a file
	const storePrices = () => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('store_prices', prices);
			ipcRenderer.on('store_prices', (e, arg) => {
				resolve(arg);
			});
		});
	};

	const checkOnlineStatus = () => {
		setOnlineStatus(navigator.onLine);
	};

	return (
		<Fragment>
			{isFetched ? (
				<div className='bg-gray-200 h-screen flex flex-col'>
					{!onlineStatus ? <Offline /> : null}

					{priceType !== '' ? (
						<PriceForm
							close={() => closeHandler()}
							type={priceType}
							price={active}
							addPrice={data => setPrices([data, ...prices])}
							editPrice={data => editPrice(data)}
							removePrice={data => removePrice(data)}
						/>
					) : null}

					<Header add={() => setPriceType('add')} online={onlineStatus} />
					<Table prices={prices} edit={price => activeHandler(price)} active={active._id} online={onlineStatus} />
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
