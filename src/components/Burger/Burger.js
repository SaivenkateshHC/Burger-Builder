import React from 'react'
import classes from "./Burger.module.css"
import BurgerIngredient from  './BurgerIngredient/BurgerIngredient'

const burger =(props)=>{

    var transformedIngredients = Object.keys(props.ingredients)
        .map(ingkey=>{
            return[...Array(props.ingredients[ingkey])].map((_,i)=>{
                return <BurgerIngredient key={ingkey+i} types={ingkey} />
            })
        }).reduce((prev,curr)=>{
            return prev.concat(curr)
        })

        if (transformedIngredients.length===0){
            transformedIngredients = <p>please add ingredients </p>
        }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient types='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient types='bread-bottom'/>
        </div>
    );
}

export default burger