import * as actionType from './actionType'

import axios from '../../axios-order'

export const addIngredients = (name)=>{
    return{
        type:actionType.ADD_INGREDIENTS,
        ingredientsName:name
    }
}

export const removeIngredients = (name)=>{
    return{
        type:actionType.REMOVE_INGREDIENTS,
        ingredientsName:name
    }
}

export const fetch_ingredients = (ingredients)=>{
    return{
        type:actionType.INIT_INGREDIENTS,
        ingredients:ingredients
    }
}

export const failed_ingredients = ()=>{
    return{
        type:actionType.FAILED_INGREDIENTS
    }
}

export const init_ingredients=()=>{
    return (dispatch)=>{
        return axios.get('')
			.then((response) => {
                dispatch(fetch_ingredients(response.data)) 
            })
			
			.catch((error) => {
				dispatch(failed_ingredients(error))
			})
        }}
