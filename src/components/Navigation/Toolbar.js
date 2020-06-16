import React from 'react';
import classes from '../Navigation/Toolbar.module.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'



const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.toggle}/>
			<div className={classes.Logo}>
				<Logo />
			</div>

			<nav className={classes.DesktopOnly}>
				<NavigationItems auth={props.isAuth}/>
			</nav>
		</header>
	);
};

export default Toolbar;
