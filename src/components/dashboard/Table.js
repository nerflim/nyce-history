import React from 'react';
import TableItem from './TableItem';

const Table = props => {
	return (
		<div className='h-full overflow-y-scroll'>
			{/* table header */}

			<div className='sticky top-0 bg-gray-100 w-full shadow px-5 text-sm'>
				<div className='table w-full'>
					<div className='table-row'>
						<div className='table-cell px-3 py-3 border-r border-l w-1/12'>Symbol</div>
						<div className='table-cell px-3 py-3 border-r w-1/12'>Price High</div>
						<div className='table-cell px-3 py-3 border-r w-1/12'>Price Low</div>
						<div className='table-cell px-3 py-3 border-r w-1/12'>Price Open</div>
						<div className='table-cell px-3 py-3 border-r w-1/12'>Price Close</div>
						<div className='table-cell px-3 py-3 border-r w-2/12'>Price Adj Close</div>
						<div className='table-cell px-3 py-3 border-r w-1/12'>Volume</div>
						<div className='table-cell px-3 py-3 border-r w-1/12'>Date</div>
						<div className='table-cell px-3 py-3 border-r w-1/12'>Option</div>
					</div>
				</div>
			</div>

			<div className='w-full p-5'>
				<div className='table w-full shadow'>
					{props.prices.map((item, index) => (
						<TableItem item={item} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Table;
