import React from 'react';

const Header = props => {
	return (
		<div className='bg-purple-800 w-full shadow py-3 px-4 flex items-center'>
			<span className='text-xl text-white'>NYSE Historical Data</span>
			<button
				className='border border-white bg-transparent ml-auto p-2 text-white rounded hover:shadow hover:bg-purple-500'
				onClick={() => props.add()}>
				Add Price
			</button>
		</div>
	);
};

export default Header;
