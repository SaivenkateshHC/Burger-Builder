import React from 'react'
import classes from '../Order/Order.module.css'

const Order = (props) => {

   
    let ingredient =[]
    for (let ingredientsName in props.ingredients){
       ingredient.push({
           name: ingredientsName,
           value: props.ingredients[ingredientsName]})
        
    }
    
    let ingredientsOutput = ingredient.map(ing=>{
        return(
            <span key={ing.name}>
               ( {ing.name}-{ing.value})
            </span>
        )
    })

    return (
        
            

        <div>
            
            <div className={classes.Order}>
            
                <p>{ingredientsOutput}</p>
                <p>Price:<strong>{props.price} Rs.</strong></p>
                
            </div>
        </div>
        
    )
}

export default Order
