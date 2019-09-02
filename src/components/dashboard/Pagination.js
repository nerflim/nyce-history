import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = props => {
	const itemClass = 'px-2 py-1 mr-1 text-white bg-purple-800 hover:bg-purple-600 hover:shadow items-center justify-center h-8';
	const disabledItemClass = 'px-2 py-1 mr-1 text-white bg-purple-800 opacity-50  items-center justify-center h-8 cursor-not-allowed';
	const pageCount = parseInt(props.pageCount, 10) ? parseInt(props.pageCount, 10) : 1;

	return (
		<div className='w-full flex px-5 py-3 mt-5 bg-purple-300 shadow-inner text-purple-800'>
			<div className='text-sm align-middle flex items-center'>
				<p>
					Showing{' '}
					<strong>
						{props.active * props.itemsPerPage - (props.itemsPerPage - 1)} to{' '}
						{props.items.length < props.itemsPerPage ? props.items.length : props.active * props.itemsPerPage} of {props.items.length}
					</strong>{' '}
					items <span className='font-bold mx-3'>|</span> Page <strong>{props.active}</strong> of <strong>{pageCount}</strong>
				</p>
			</div>

			<div className='ml-auto text-sm flex'>
				{/* pagination left controls */}

				<button
					type='button'
					className={props.active === 1 ? disabledItemClass : itemClass}
					disabled={props.active === 1 ? true : false}
					onClick={() => props.prev()}>
					<FontAwesomeIcon icon={faAngleLeft} size='xs' /> Previous
				</button>

				{/* pagination right controls */}

				<button
					type='button'
					className={props.active === pageCount ? disabledItemClass : itemClass}
					disabled={props.active === pageCount ? true : false}
					onClick={() => props.next()}>
					Next <FontAwesomeIcon icon={faAngleRight} size='xs' />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
