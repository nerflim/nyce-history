import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Offline = () => {
	return (
		<div className='w-full bg-red-700 text-white px-2 py-1 text-sm shadow'>
			<FontAwesomeIcon icon={faInfoCircle} size='sm' /> No internet connection. You can only view the prices.
		</div>
	);
};

export default Offline;
