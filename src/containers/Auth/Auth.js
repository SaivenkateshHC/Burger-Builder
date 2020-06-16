import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

import * as actions from '../../store/action/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateUtility, checkValidity } from '../../Shared/utility';

const auth = (props) => {
	// eslint-disable-next-line
	const [authForm, setAuthForm] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Email Address',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 7,
			},
			valid: false,
			touched: false,
		},
	});
	// eslint-disable-next-line
    const [isSignUp, setIsSignUp] = useState(true);
    
    const {BuildingBuilder,authRedirected,onRedirect}=props

	// eslint-disable-next-line
	useEffect(() => {
		if (!BuildingBuilder && authRedirected !== '/') {
			return onRedirect();
        }
        // eslint-disable-next-line
	}, [BuildingBuilder,authRedirected,onRedirect]);

	const inputHandler = (event, controlName) => {
		const updatedControls = updateUtility(authForm, {
			[controlName]: updateUtility(authForm[controlName], {
				value: event.target.value,
				valid: checkValidity(
					authForm[controlName].validation,
					event.target.value
				),
				touched: true,
			}),
		});
		setAuthForm(updatedControls);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
	};
	const signUpHandler = () => {
		setIsSignUp(!isSignUp);
	};

	const formElement = [];
	for (let key in authForm) {
		formElement.push({ id: key, config: authForm[key] });
	}
	let form = formElement.map((formEl) => {
		return (
			<Input
				key={formEl.id}
				elementType={formEl.config.elementType}
				elementConfig={formEl.config.elementConfig}
				value={formEl.config.value}
				invalid={!formEl.config.valid}
				shouldValidate={formEl.config.validation}
				touch={formEl.config.touched}
				change={(event) => inputHandler(event, formEl.id)}
			/>
		);
	});

	if (props.loading) {
		form = <Spinner />;
	}

	let errorMessage = null;

	if (props.error) {
		errorMessage = <p>{props.error.message}</p>;
	}

	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirected} />;
	}
	return (
		<div className={classes.Auth}>
			{authRedirect}
			<span>LOGIN</span>
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}

				<Button btnType='Success'> LOGIN</Button>
			</form>
			<Button clicked={signUpHandler} btnType='Danger'>
				{' '}
				Switch to {isSignUp ? 'SignIN' : 'SignUP'}
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.idToken != null,
		BuildingBuilder: state.burgerBuilder.building,
		authRedirected: state.auth.redirecting,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		onRedirect: () => dispatch(actions.set_auth_redirect('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
