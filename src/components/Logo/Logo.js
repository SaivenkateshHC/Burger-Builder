import React from 'react'
import classes from './Logo.module.css'
import BurgerLogo from '../../assets/images/burger-logo.png'

const Logo = (props) => {
    return (
        <div className={classes.Logo} style = {{height :props.height}}>
            <img src={BurgerLogo} alt='The Burger' />
            
        </div>
    )
}

export default Logo
