import React, { useState } from 'react';
import TableItem from './TableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Table = props => {
	const [order, setOrder] = useState(false); // true → asc, false → desc
	const [orderBy, setOrderBy] = useState('date');

	const filteredPrices = props.prices.sort((a, b) => {
		if (orderBy === 'date' && !order) {
			// return descending
			return parseInt(moment(b.date).format('X'), 10) - parseInt(moment(a.date).format('X'), 10);
		} else if (orderBy === 'date' && order) {
			// return ascending
			return parseInt(moment(a[orderBy]).format('X'), 10) - parseInt(moment(b[orderBy]).format('X'), 10);
		} else if (orderBy !== 'stock_symbol' && !order) {
			//return descending
			return parseFloat(b[orderBy]) - parseFloat(a[orderBy]);
		} else if (orderBy !== 'stock_symbol' && order) {
			// return ascending
			return parseFloat(a[orderBy]) - parseFloat(b[orderBy]);
		} else if (orderBy === 'stock_symbol' && !order && a.stock_symbol > b.stock_symbol) {
			return -1;
		} else if (orderBy === 'stock_symbol' && !order && a.stock_symbol < b.stock_symbol) {
			return 1;
		} else if (orderBy === 'stock_symbol' && order && a.stock_symbol > b.stock_symbol) {
			return 1;
		} else if (orderBy === 'stock_symbol' && order && a.stock_symbol < b.stock_symbol) {
			return -1;
		}
		return 0;
	});

	const filterHandler = reqOrderBy => {
		if (reqOrderBy === orderBy) {
			setOrder(!order);
		} else {
			setOrderBy(reqOrderBy);
			setOrder(false);
		}
	};

	return (
		<div className='h-full overflow-y-scroll'>
			{/* table header */}

			<div className='sticky top-0 bg-gray-100 w-full shadow px-5 text-sm'>
				<div className='table w-full'>
					<div className='table-row'>
						<div className='table-cell border-r border-l w-1/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('stock_symbol')}>
								Symbol {orderBy === 'stock_symbol' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell border-r w-1/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('stock_price_high')}>
								Price High {orderBy === 'stock_price_high' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell border-r w-1/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('stock_price_low')}>
								Price Low {orderBy === 'stock_price_low' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell border-r w-1/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('stock_price_open')}>
								Price Open {orderBy === 'stock_price_open' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell border-r w-1/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('stock_price_close')}>
								Price Close {orderBy === 'stock_price_close' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell border-r w-2/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('stock_price_adj_close')}>
								Price Adj Close{' '}
								{orderBy === 'stock_price_adj_close' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell border-r w-1/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('stock_volume')}>
								Volume {orderBy === 'stock_volume' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell border-r w-1/12'>
							<button className='flex items-center px-3 py-3 w-full text-left' onClick={() => filterHandler('date')}>
								Date {orderBy === 'date' ? <FontAwesomeIcon icon={order ? faCaretUp : faCaretDown} className='ml-auto' /> : null}
							</button>
						</div>
						<div className='table-cell p-3 border-r w-1/12'>Option</div>
					</div>
				</div>
			</div>

			<div className='w-full p-5'>
				<div className='table w-full shadow'>
					{filteredPrices.map((item, index) => (
						<TableItem item={item} key={index} edit={() => props.edit(item)} active={props.active} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Table;
