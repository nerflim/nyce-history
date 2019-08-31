import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const FormLoader = props => {
	const css = `display: block; margin: 0 auto;border-color: red;`;
	return (
		<React.Fragment>
			{props.type === 'remove' ? (
				<div className='text-center p-8'>
					<SyncLoader size={10} color='#e53e3e' css={css} />
					<p className='text-red-700 mt-3 text-sm'>Removing price... Please wait...</p>
				</div>
			) : props.type === 'add' ? (
				<div className='text-center p-8'>
					<SyncLoader size={10} color='#48bb78' css={css} />
					<p className='text-green-600 mt-3 text-sm'>Adding price... Please wait...</p>
				</div>
			) : (
				<div className='text-center p-8'>
					<SyncLoader size={10} color='#48bb78' css={css} />
					<p className='text-green-600 mt-3 text-sm'>Updating price... Please wait...</p>
				</div>
			)}
		</React.Fragment>
	);
};

export default FormLoader;
