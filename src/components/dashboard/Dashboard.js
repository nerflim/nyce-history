import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Table from './Table';
import Pagination from './Pagination';

const Dashboard = () => {
	return (
		<div className='bg-gray-200 h-screen flex flex-col'>
			<Header />
			<Table />
			<Pagination />
			{/* <div>
				<Link to='/'>go back</Link>
			</div> */}
		</div>
	);
};

export default Dashboard;
