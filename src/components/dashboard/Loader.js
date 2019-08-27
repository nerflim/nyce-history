import React, { useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';

const Loader = () => {
	const [css, setCss] = useState(`display: block; margin: 0 auto;border-color: red;`);
	return (
		<div className='flex items-center justify-center bg-purple-800 text-white h-screen w-100'>
			<div className='text-center'>
				<BarLoader width='200' color='#ffffff' css={css} />
				<p className='text-purple-500 mt-3 text-sm'>Fetching data... Please wait...</p>
			</div>
		</div>
	);
};

export default Loader;
