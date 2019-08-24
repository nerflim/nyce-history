import React from 'react';

const TableItem = props => {
	return (
		<div className='table-row bg-white text-xs hover:bg-purple-100'>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.symbol}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.price_high}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.price_low}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.price_open}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.price_close}</div>
			<div className='table-cell p-2 border-r w-2/12'>{props.item.price_adj_close}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.volume}</div>
			<div className='table-cell p-2 border-r w-1/12'>{props.item.date}</div>
			<div className='table-cell w-1/12'>
				<button type='button' className='p-2 hover:bg-purple-800 hover:text-white w-full'>
					Edit
				</button>
			</div>
		</div>
	);
};

export default TableItem;
