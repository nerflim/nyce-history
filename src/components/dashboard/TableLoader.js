import React from 'react';

const TableLoader = () => {
	return (
		<React.Fragment>
			<div className='bg-black absolute w-full z-10 opacity-75 h-full' />
			<div className='flex items-center absolute w-full h-full'>
				<div className='text-white mx-auto opacity-100 z-20 p-3'>Fetching New Prices... Please Wait...</div>
			</div>
		</React.Fragment>
	);
};

export default TableLoader;
