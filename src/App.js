import React,{ useEffect,Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

import logout from './containers/Auth/Logout/logout';



import * as action from './store/action/index';

const Checkout = React.lazy(() => {
	return import('./containers/Checkout/Checkout');
});

const Order = React.lazy(() => {
	return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
	return import('./containers/Auth/Auth');
});

const App = (props) => {
	
	const {onAuthTry}=props
	useEffect(() => {
		props.onAuthTry();// eslint-disable-next-line
	}, [onAuthTry]);

	let routes = (
		<Switch>
			<Route path='/' exact component={BurgerBuilder} />
			<Route path='/auth' render={(props)=><Auth {...props}/>} />
			<Redirect to='/' />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path='/orders' exact  render={(props)=><Order {...props}/>} />
				<Route path='/checkout' render={(props)=><Checkout {...props}/>} />
				<Route path='/auth'  render={(props)=><Auth {...props}/>} />

				<Route path='/logout' component={logout} />

				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		);
	}
	return (
		<div>
			<Layout><Suspense fallback='Loading..'>{routes}</Suspense></Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.idToken != null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuthTry: () => dispatch(action.auth_check_state()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
