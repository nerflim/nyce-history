import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Pagination = () => {
	const itemClass = 'px-2 py-1 mr-1 hover:text-white hover:bg-purple-800 hover:shadow items-center justify-center w-8 h-8';
	const activeClass = 'px-2 py-1 mr-1 text-white bg-purple-800 shadow items-center justify-center w-8 h-8';
	const pages = '1 2 3 4 5 6 7 8 9 10'.split(' ');
	const [active, setActive] = useState(2);
	const [items, setItems] = useState([]);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/photos').then(res => initData(res.data));
	}, []);

	const initData = data => {
		setItems(data);
	};

	const prev = () => {
		return active > 0 ? setActive(active - 1) : null;
	};

	const first = () => {
		return setActive(0);
	};

	const next = () => {
		return active < pages.length - 1 ? setActive(active + 1) : null;
	};

	const last = () => {
		return setActive(pages.length - 1);
	};

	return (
		<div className='w-full flex px-5 py-3 mt-5 bg-purple-300 shadow-inner text-purple-800'>
			<div className='text-sm align-middle flex items-center'>
				<p>
					Showing <strong>1 to 8 of {items.length}</strong> items
				</p>
			</div>
			<div className='ml-auto text-sm flex'>
				<button type='button' className={itemClass} onClick={() => first()}>
					<FontAwesomeIcon icon={faAngleDoubleLeft} size='xs' />
				</button>
				<button type='button' className={itemClass} onClick={() => prev()}>
					<FontAwesomeIcon icon={faAngleLeft} size='xs' />
				</button>
				{pages.map((page, index) => (
					<button type='button' className={index === active ? activeClass : itemClass} key={index} onClick={() => setActive(index)}>
						{page}
					</button>
				))}
				<button type='button' className={itemClass} onClick={() => next()}>
					<FontAwesomeIcon icon={faAngleRight} size='xs' />
				</button>
				<button type='button' className={itemClass} onClick={() => last()}>
					<FontAwesomeIcon icon={faAngleDoubleRight} size='xs' />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
