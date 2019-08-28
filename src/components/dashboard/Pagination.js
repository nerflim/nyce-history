import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = props => {
	const itemClass = 'px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center h-8';
	const disabledItemClass = 'px-2 py-1 mr-1 text-purple-400 items-center justify-center h-8';
	const activeClass = 'px-2 py-1 mr-1 text-white bg-purple-800 shadow items-center justify-center h-8';
	const visiblePages = [1, 2, 3, 4, 5, 6, 7];

	return (
		<div className='w-full flex px-5 py-3 mt-5 bg-purple-300 shadow-inner text-purple-800'>
			<div className='text-sm align-middle flex items-center'>
				<p>
					Showing{' '}
					<strong>
						{props.active * 10 - 9} to {props.active * 10} of {props.items.length}
					</strong>{' '}
					items
				</p>
			</div>

			<div className='ml-auto text-sm flex'>
				{/* pagination left controls */}

				<button
					type='button'
					className={props.active === 1 ? disabledItemClass : itemClass}
					disabled={props.active === 1 ? true : false}
					onClick={() => props.first()}
				>
					<FontAwesomeIcon icon={faAngleDoubleLeft} size='xs' />
				</button>
				<button
					type='button'
					className={props.active === 1 ? disabledItemClass : itemClass}
					disabled={props.active === 1 ? true : false}
					onClick={() => props.prev()}
				>
					<FontAwesomeIcon icon={faAngleLeft} size='xs' />
				</button>

				{/* pages */}

				{props.active > 7 ? (
					<Fragment>
						<button type='button' className={itemClass} onClick={() => props.setActive(1)}>
							1
						</button>
						<button type='button' className='px-2 py-1 mr-1 justify-center h-8' disabled>
							...
						</button>
					</Fragment>
				) : null}

				{visiblePages.map((page, index) =>
					props.active < 8 ? (
						// if active page is less than 8
						<button type='button' className={page === props.active ? activeClass : itemClass} key={index} onClick={() => props.setActive(page)}>
							{page}
						</button>
					) : props.active > props.pageCount - 7 ? (
						// if active is greater than the props.pageCount - 7
						<button
							type='button'
							className={page + props.active - 7 === props.active ? activeClass : itemClass}
							key={index}
							onClick={() => props.setActive(page + props.active - 7)}
						>
							{page + props.active - 7}
						</button>
					) : (
						<button
							type='button'
							className={page + props.active - 4 === props.active ? activeClass : itemClass}
							key={index}
							onClick={() => props.setActive(page + props.active - 4)}
						>
							{page + props.active - 4}
						</button>
					)
				)}

				{props.active < props.pageCount - 7 ? (
					<Fragment>
						<button type='button' className='px-2 py-1 mr-1 justify-center h-8' disabled>
							...
						</button>
						<button
							type='button'
							className={props.pageCount === props.active ? activeClass : itemClass}
							onClick={() => props.setActive(props.pageCount)}
						>
							{props.pageCount}
						</button>
					</Fragment>
				) : null}

				{/* pagination right controls */}

				<button
					type='button'
					className={props.active === props.pageCount ? disabledItemClass : itemClass}
					disabled={props.active === props.pageCount ? true : false}
					onClick={() => props.next()}
				>
					<FontAwesomeIcon icon={faAngleRight} size='xs' />
				</button>
				<button
					type='button'
					className={props.active === props.pageCount ? disabledItemClass : itemClass}
					disabled={props.active === props.pageCount ? true : false}
					onClick={() => props.last()}
				>
					<FontAwesomeIcon icon={faAngleDoubleRight} size='xs' />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
