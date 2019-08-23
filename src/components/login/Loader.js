import React, { useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';

const Loader = () => {
	const [css, setCss] = useState(`display: block; margin: 0 auto;border-color: red;`);
	return (
		<div className='text-center'>
			<BarLoader width='200' color='#ffffff' css={css} />
			<p className='text-purple-500 mt-3 text-sm'>Logging in... Please wait...</p>
		</div>
	);
};

export default Loader;
