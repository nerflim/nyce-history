import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = props => {
	const itemClass = 'px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center h-8';
	const disabledItemClass = 'px-2 py-1 mr-1 text-purple-400 items-center justify-center h-8';
	const activeClass = 'px-2 py-1 mr-1 text-white bg-purple-800 shadow items-center justify-center h-8';
	const [active, setActive] = useState(1);
	const itemsPerPage = 10;
	const pageCount = props.items.length / itemsPerPage;
	const visiblePages = [1, 2, 3, 4, 5, 6, 7];

	const prev = () => {
		console.log(active);
		return active > 1 ? setActive(active - 1) : null;
	};

	const first = () => {
		console.log(active);
		return setActive(1);
	};

	const next = () => {
		console.log(active);
		return active < pageCount ? setActive(active + 1) : null;
	};

	const last = () => {
		console.log(active);
		return setActive(pageCount);
	};

	return (
		<div className='w-full flex px-5 py-3 mt-5 bg-purple-300 shadow-inner text-purple-800'>
			<div className='text-sm align-middle flex items-center'>
				<p>
					Showing{' '}
					<strong>
						{active * 10 - 9} to {active * 10} of {props.items.length}
					</strong>{' '}
					items
				</p>
			</div>

			<div className='ml-auto text-sm flex'>
				{/* pagination left controls */}

				<button type='button' className={active === 1 ? disabledItemClass : itemClass} disabled={active === 1 ? true : false} onClick={() => first()}>
					<FontAwesomeIcon icon={faAngleDoubleLeft} size='xs' />
				</button>
				<button type='button' className={active === 1 ? disabledItemClass : itemClass} disabled={active === 1 ? true : false} onClick={() => prev()}>
					<FontAwesomeIcon icon={faAngleLeft} size='xs' />
				</button>

				{/* pages */}

				{active > 7 ? (
					<Fragment>
						<button type='button' className={itemClass} onClick={() => setActive(1)}>
							1
						</button>
						<button type='button' className='px-2 py-1 mr-1 justify-center h-8' disabled>
							...
						</button>
					</Fragment>
				) : null}

				{visiblePages.map((page, index) =>
					active < 8 ? (
						// if active page is less than 8
						<button type='button' className={page === active ? activeClass : itemClass} key={index} onClick={() => setActive(page)}>
							{page}
						</button>
					) : active > pageCount - 7 ? (
						// if active is greater than the pageCount - 7
						<button
							type='button'
							className={page + active - 7 === active ? activeClass : itemClass}
							key={index}
							onClick={() => setActive(page + active - 7)}>
							{page + active - 7}
						</button>
					) : (
						<button
							type='button'
							className={page + active - 4 === active ? activeClass : itemClass}
							key={index}
							onClick={() => setActive(page + active - 4)}>
							{page + active - 4}
						</button>
					)
				)}

				{active < pageCount - 7 ? (
					<Fragment>
						<button type='button' className='px-2 py-1 mr-1 justify-center h-8' disabled>
							...
						</button>
						<button type='button' className={pageCount === active ? activeClass : itemClass} onClick={() => setActive(pageCount)}>
							{pageCount}
						</button>
					</Fragment>
				) : null}

				{/* pagination right controls */}

				<button
					type='button'
					className={active === pageCount ? disabledItemClass : itemClass}
					disabled={active === pageCount ? true : false}
					onClick={() => next()}>
					<FontAwesomeIcon icon={faAngleRight} size='xs' />
				</button>
				<button
					type='button'
					className={active === pageCount ? disabledItemClass : itemClass}
					disabled={active === pageCount ? true : false}
					onClick={() => last()}>
					<FontAwesomeIcon icon={faAngleDoubleRight} size='xs' />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
