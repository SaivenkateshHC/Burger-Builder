import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from '../CheckoutSummary/CheckoutSummary.module.css'


function CheckoutSummary(props) {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope you like this</h1>
            <div style={{width:'100%', margin:'autop'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.CheckoutCancel}>CANCEL</Button>
            <Button btnType = "Success" clicked={props.CheckoutContinue}>CONTINUE</Button>

        </div>
    )
}

export default CheckoutSummary
