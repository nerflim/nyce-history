import React from 'react';
import moment from 'moment';

const Header = props => {
	const buttonClass = 'border border-white bg-transparent p-2 text-white rounded hover:shadow hover:bg-purple-500';
	const disabledButtonClass = 'border border-white bg-transparent p-2 text-white rounded opacity-50 cursor-not-allowed';
	return (
		<div className='bg-purple-800 w-full shadow py-3 px-4 flex items-center'>
			{/* <span className='text-xl text-white'>NYSE Historical Data</span> */}
			<div className='text-white'>
				<label className='text-xs'>Start: </label>
				<input
					type='date'
					className='border-white bg-transparent border p-1 text-sm rounded ml-2 mr-3'
					value={moment(props.startDate).format('YYYY-MM-DD')}
					onChange={e => props.startDateHandler(new Date(e.target.value))}
				/>
				<label className='text-xs'>End: </label>
				<input
					type='date'
					className='border-white bg-transparent border p-1 text-sm rounded  ml-2'
					value={moment(props.endDate).format('YYYY-MM-DD')}
					onChange={e => props.endDateHandler(new Date(e.target.value))}
				/>
			</div>
			<div className='ml-auto'>
				<button className={props.online ? buttonClass : disabledButtonClass} onClick={() => props.add()} disabled={!props.online}>
					Add Price
				</button>
			</div>
		</div>
	);
};

export default Header;
