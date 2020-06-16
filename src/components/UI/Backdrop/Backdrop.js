import React from 'react'
import classes from '../Backdrop/Backdrop.module.css'

const Backdrop = (props) => {
    return (
        props.show?<div className={classes.Backdrop} onClick={props.close}></div>:null
    )
}

export default Backdrop
