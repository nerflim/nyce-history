import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = () => {
	return (
		<div className='w-full flex px-5 py-3 mt-5 bg-purple-300 shadow-inner text-purple-800'>
			<div className='text-sm align-middle flex items-center'>
				<p>
					Showing <strong>1 to 8 of 1000</strong> items
				</p>
			</div>
			<div className='ml-auto text-sm flex'>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					<FontAwesomeIcon icon={faAngleDoubleLeft} size='xs' />
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					<FontAwesomeIcon icon={faAngleLeft} size='xs' />
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					1
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					2
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					3
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					4
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					5
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					<FontAwesomeIcon icon={faAngleRight} size='xs' />
				</button>
				<button type='button' className='px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8'>
					<FontAwesomeIcon icon={faAngleDoubleRight} size='xs' />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
