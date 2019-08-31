import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
const { ipcRenderer } = window.require('electron');

const PriceForm = props => {
	const [price, setPrice] = useState(() => {
		if (props.type === 'edit') {
			return {
				stock_symbol: props.price.stock_symbol,
				stock_price_high: props.price.stock_price_high,
				stock_price_low: props.price.stock_price_low,
				stock_price_open: props.price.stock_price_open,
				stock_price_close: props.price.stock_price_close,
				stock_price_adj_close: props.price.stock_price_adj_close,
				stock_volume: props.price.stock_volume,
				date: moment(props.price.date).format('YYYY-MM-DD')
			};
		}
		return {
			stock_symbol: '',
			stock_price_high: '',
			stock_price_low: '',
			stock_price_open: '',
			stock_price_close: '',
			stock_price_adj_close: '',
			stock_volume: '',
			date: ''
		};
	});

	// handles the add
	const addHandler = () => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('store', price);
			ipcRenderer.on('store', (event, arg) => {
				resolve(arg);
			});
		});
	};

	// handles the edit
	const editHandler = () => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('update', { _id: props.price._id, stock_exchange: props.price.stock_exchange, ...price });
			ipcRenderer.on('update', (event, arg) => {
				resolve(arg);
			});
		});
	};

	const submitHandler = e => {
		e.preventDefault();
		console.log(price);
		if (props.type === 'add') {
			// call add handler
			addHandler().then(res => {
				props.addPrice(res);
				props.close();
			});
		} else {
			// call edit handler
			editHandler().then(res => {
				props.editPrice(res);
				props.close();
			});
		}
	};
	return (
		<React.Fragment>
			<div className='bg-black absolute w-full z-10 opacity-75 h-full' />
			<div className='flex items-center absolute w-full h-full'>
				<div className='w-20 bg-white mx-auto opacity-100 z-20 p-3 w-3/4'>
					<div className='flex mb-4 text-gray-700'>
						<h1 className='text-lg'>{props.type === 'add' ? 'ADD PRICE' : 'EDIT PRICE'}</h1>
						<button className='ml-auto' onClick={() => props.close()}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>
					<form className='w-full' onSubmit={e => submitHandler(e)}>
						<div className='flex flex-row mb-4'>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Symbol</label>
								<input
									type='text'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Symbol'
									value={price.stock_symbol}
									onChange={e => setPrice({ ...price, stock_symbol: e.target.value })}
								/>
							</div>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Price High</label>
								<input
									type='number'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Price High'
									value={price.stock_price_high}
									onChange={e => setPrice({ ...price, stock_price_high: e.target.value })}
								/>
							</div>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Price Low</label>
								<input
									type='number'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Price Low'
									value={price.stock_price_low}
									onChange={e => setPrice({ ...price, stock_price_low: e.target.value })}
								/>
							</div>
						</div>
						<div className='flex flex-row mb-4'>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Price Open</label>
								<input
									type='number'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Price Open'
									value={price.stock_price_open}
									onChange={e => setPrice({ ...price, stock_price_open: e.target.value })}
								/>
							</div>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Price Close</label>
								<input
									type='number'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Price Close'
									value={price.stock_price_close}
									onChange={e => setPrice({ ...price, stock_price_close: e.target.value })}
								/>
							</div>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Price Adj Close</label>
								<input
									type='number'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Price Adj Close'
									value={price.stock_price_adj_close}
									onChange={e => setPrice({ ...price, stock_price_adj_close: e.target.value })}
								/>
							</div>
						</div>
						<div className='flex flex-row mb-4'>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Volume</label>
								<input
									type='number'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Volume'
									value={price.stock_volume}
									onChange={e => setPrice({ ...price, stock_volume: e.target.value })}
								/>
							</div>
							<div className='w-4/12 mx-2'>
								<label className='block mb-2 text-sm text-gray-600'>Date</label>
								<input
									type='date'
									className='border border-gray-400 rounded w-full py-2 px-3'
									placeholder='Date'
									value={price.date}
									onChange={e => setPrice({ ...price, date: e.target.value })}
								/>
							</div>
							<div className='w-4/12 mx-2' />
						</div>

						<div className='flex text-gray-700 border-t pt-2 px-2'>
							<button type='submit' className='ml-auto bg-purple-700 text-white p-2 rounded'>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
};

export default PriceForm;
