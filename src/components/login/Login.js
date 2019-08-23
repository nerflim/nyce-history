import React, { useState, Fragment } from 'react';
import {} from 'react-router-dom';
import Loader from './Loader';

const Login = props => {
	const [username, setUsername] = useState('root');
	const [password, setPassword] = useState('password123');
	const [isLogin, setIsLogin] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);

	const [usrlogin, setUsrlogin] = useState('');
	const [pwdlogin, setPwdlogin] = useState('');

	const loginHandler = e => {
		// prevent from reloading the page
		e.preventDefault();

		// display login loader
		setIsLogin(true);

		// add login loader timeout
		setTimeout(() => {
			if (usrlogin === username && pwdlogin === password) {
				redirectHandler();
			} else {
				setIsLogin(false);
				setLoginFailed(true);
			}
		}, 1000);
	};

	const redirectHandler = () => {
		const location = {
			pathname: '/dashboard'
		};
		props.history.push(location);
	};

	return (
		<div className='bg-purple-800 h-screen text-center p-8 text-white flex items-center'>
			<div className='m-auto'>
				{!isLogin ? (
					<Fragment>
						<h1 className='text-2xl mb-8'>NYCE History</h1>
						{loginFailed ? <div>Login failed. Try again.</div> : ''}
						<span className='text-purple-400'>Login to your account</span>
						<form className='mt-2 w-64 m-auto text-left text-purple-500' onSubmit={e => loginHandler(e)}>
							<div className='mb-3'>
								<input
									type='text'
									value={usrlogin}
									onChange={e => setUsrlogin(e.target.value)}
									placeholder='Username'
									className='bg-purple-700 py-2 px-4 block rounded-lg w-full m-auto border border-purple-600 focus:outline-none focus:outline-none focus:shadow-md hover:shadow-md focus:text-purple-100 focus:border-purple-500'
								/>
								<small>Username</small>
							</div>
							<div className='mb-3'>
								<input
									type='password'
									value={pwdlogin}
									onChange={e => setPwdlogin(e.target.value)}
									placeholder='Password'
									className='bg-purple-700 py-2 px-4 block rounded-lg w-full m-auto border border-purple-600 focus:outline-none focus:outline-none focus:shadow-md hover:shadow-md focus:text-purple-100 focus:border-purple-500'
								/>
								<small>Password</small>
							</div>
							<div className='mb-3'>
								<button
									type='submit'
									className='py-2 px-4 rounded-lg w-full m-auto bg-purple-900 hover:bg-purple-700 focus:shadow-md hover:shadow-md'>
									Login
								</button>
							</div>
						</form>
					</Fragment>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default Login;
