import React from 'react';

const TableItem = () => {
	return (
		<div className='table-row bg-white text-xs hover:bg-purple-100'>
			<div className='table-cell p-2 border-r w-1/12'>AEA</div>
			<div className='table-cell p-2 border-r w-1/12'>4.42</div>
			<div className='table-cell p-2 border-r w-1/12'>4.21</div>
			<div className='table-cell p-2 border-r w-1/12'>4.42</div>
			<div className='table-cell p-2 border-r w-1/12'>4.24</div>
			<div className='table-cell p-2 border-r w-2/12'>4.24</div>
			<div className='table-cell p-2 border-r w-1/12'>205500</div>
			<div className='table-cell p-2 border-r w-1/12'>8/2/2010</div>
			<div className='table-cell w-1/12'>
				<button type='button' className='p-2 hover:bg-purple-800 hover:text-white w-full'>
					Edit
				</button>
			</div>
		</div>
	);
};

export default TableItem;
