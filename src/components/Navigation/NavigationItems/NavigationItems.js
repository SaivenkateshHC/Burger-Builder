import React from 'react';
import classes from '../NavigationItems/NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
const NavigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link='/' exact active>
				Burger Builder
			</NavigationItem>
			{props.auth ? <NavigationItem link='/orders'>Orders</NavigationItem>: null}
			{props.auth 
				?<NavigationItem link='/logout'>Logout</NavigationItem>
				:<NavigationItem link='/auth'>Authenticate</NavigationItem>
			}
			
		</ul>
	);
};

export default NavigationItems;
