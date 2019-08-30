import React from 'react';
import moment from 'moment';

const TableItem = props => {
	const active = 'table-row bg-purple-300 text-xs hover:bg-purple-100';
	const rowClass = 'table-row bg-white text-xs hover:bg-purple-100';
	return (
		<div className={props.active === props.item._id ? active : rowClass}>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.stock_symbol}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.stock_price_high}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.stock_price_low}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.stock_price_open}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.stock_price_close}</div>
			<div className='table-cell p-2 border-r w-2/12'>{props.item.stock_price_adj_close}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.stock_volume}</div>
			<div className='table-cell p-2 border-r w-1/12'>{moment(props.item.date).format('DD-MM-YYYY')}</div>
			<div className='table-cell w-1/12'>
				<button type='button' className='p-2 hover:bg-purple-800 hover:text-white w-full' onClick={() => props.edit()}>
					Edit
				</button>
			</div>
		</div>
	);
};

export default TableItem;
