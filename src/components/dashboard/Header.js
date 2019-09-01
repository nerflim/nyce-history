import React from 'react';

const Header = props => {
	const buttonClass = 'border border-white bg-transparent ml-auto p-2 text-white rounded hover:shadow hover:bg-purple-500';
	const disabledButtonClass = 'border border-white bg-transparent ml-auto p-2 text-white rounded opacity-50 cursor-not-allowed';
	return (
		<div className='bg-purple-800 w-full shadow py-3 px-4 flex items-center'>
			<span className='text-xl text-white'>NYSE Historical Data</span>
			<button className={props.online ? buttonClass : disabledButtonClass} onClick={() => props.add()} disabled={!props.online}>
				Add Price
			</button>
		</div>
	);
};

export default Header;
