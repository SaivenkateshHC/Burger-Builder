import React from 'react'
import BurgerControl from '../BuildControls/BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls=[
    {label:'Salad',types:'salad'},
    {label:'Meat',types:'meat'},
    {label:'Bacon',types:'bacon'},
    {label:'Cheese',types:'cheese'},
   
];

const BuildControls =(props)=>(
    <div className={classes.BuildControls}>
        <p>Current Price: {props.price} Rs.</p>
        {controls.map(ctrl=>(
            <BurgerControl 
            key={ctrl.label} 
            label={ctrl.label}
            add = {()=>{
                props.addingIngredient(ctrl.types)
            }}
            remove = {()=>{
                props.removingIngredient(ctrl.types)
            }}
            disabled = {props.disabled[ctrl.types]}
            
            />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable} 
            onClick={props.ordering}
        > 
            {props.auth? "ORDER NOW":"SIGN IN"}
        </button>

       

    </div>
)

export default BuildControls