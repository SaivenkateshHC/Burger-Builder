import React,{useState} from 'react';
import Aux from '../Auxillary';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import {connect} from 'react-redux'

const Layout=props=>{

	const [showSideDrawerVisible, setShowSideDrawerVisible]= useState(false)

	const SideDrawerClosedHandler = ()=>{
		setShowSideDrawerVisible(false)
	}

	const DrawerToggleHandler=()=>{
		setShowSideDrawerVisible(!showSideDrawerVisible )
	}
	
	return (
		<Aux>
			<Toolbar toggle = {DrawerToggleHandler} isAuth={props.isAuthenticated}/>
			<SideDrawer open={showSideDrawerVisible} isAuth={props.isAuthenticated} closed = {SideDrawerClosedHandler}/>
			<main>{props.children}</main>
		</Aux>
	);
	
	
}

const mapStateToProps = (state)=>{
	return{
		isAuthenticated: state.auth.idToken !=null
	}
}

	

export default connect(mapStateToProps)(Layout);
