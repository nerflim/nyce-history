import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import FormLoader from './FormLoader';
const { ipcRenderer } = window.require('electron');

const PriceForm = props => {
	const [isRemove, setIsRemove] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
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
			date: moment().format('YYYY-MM-DD')
		};
	});

	// handles the add
	const addHandler = () => {
		setIsAdding(!isAdding);

		return new Promise((resolve, reject) => {
			ipcRenderer.send('store', price);
			ipcRenderer.on('store', (event, arg) => {
				resolve(arg);
			});
		});
	};

	// handles the edit
	const editHandler = () => {
		setIsEditing(!isEditing);

		return new Promise((resolve, reject) => {
			ipcRenderer.send('update', { _id: props.price._id, stock_exchange: props.price.stock_exchange, ...price });
			ipcRenderer.on('update', (event, arg) => {
				resolve(arg);
			});
		});
	};

	// handles removing of the price
	const removeHandler = () => {
		// display loader
		setIsRemoving(!isRemoving);

		new Promise((resolve, reject) => {
			ipcRenderer.send('destroy', props.price._id);
			ipcRenderer.on('destroy', (event, arg) => {
				resolve(arg);
			});
		}).then(res => {
			props.removePrice(res);
			props.close();
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

	// disables submit button to prevent submitting the form when the required fields are empty
	const disabledSubmit =
		price.stock_symbol === '' ||
		price.stock_price_high === '' ||
		price.stock_price_low === '' ||
		price.stock_price_open === '' ||
		price.stock_price_close === '' ||
		price.stock_price_adj_close === '' ||
		price.stock_volume === '' ||
		price.date === ''
			? true
			: false;

	return (
		<React.Fragment>
			<div className='bg-black absolute w-full z-10 opacity-75 h-full' />
			<div className='flex items-center absolute w-full h-full'>
				<div className='w-20 bg-white mx-auto opacity-100 z-20 p-3 w-3/4'>
					{isRemoving && !isAdding && !isEditing ? (
						<FormLoader type={'remove'} />
					) : !isRemoving && isAdding && !isEditing ? (
						<FormLoader type={'add'} />
					) : !isRemoving && !isAdding && isEditing ? (
						<FormLoader type={'edit'} />
					) : (
						<React.Fragment>
							<div className='flex mb-4 text-gray-700'>
								<h1 className='text-lg'>{props.type === 'add' ? 'ADD PRICE' : 'EDIT PRICE'}</h1>
								<button className='ml-auto' onClick={() => props.close()}>
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>
							{!isRemove ? (
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
												required
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
												required
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
												required
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
												required
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
												required
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
												required
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
												required
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
												required
											/>
										</div>
										<div className='w-4/12 mx-2' />
									</div>

									<div className='flex items-center text-gray-700 border-t pt-2 px-2'>
										{props.type === 'edit' ? (
											<button type='button' className='bg-transparent text-red-700 p-0 m-0 text-sm' onClick={() => setIsRemove(!isRemove)}>
												<FontAwesomeIcon icon={faTrashAlt} size='sm' /> Remove Price
											</button>
										) : null}
										<button
											type='submit'
											className={`ml-auto bg-purple-700 text-white p-2 rounded ${disabledSubmit ? `opacity-50 cursor-not-allowed` : ''}`}
											disabled={disabledSubmit}>
											Submit
										</button>
									</div>
								</form>
							) : (
								<div className='text-center text-red-700 py-8'>
									<h1 className='text-xl'>Are you sure you want to remove this price?</h1>
									<button type='button' className='m-3 bg-gray-700 text-white rounded p-2' onClick={() => setIsRemove(!isRemove)}>
										Cancel
									</button>
									<button type='button' className='m-3 bg-red-700 text-white rounded p-2' onClick={() => removeHandler()}>
										Confirm
									</button>
								</div>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default PriceForm;
