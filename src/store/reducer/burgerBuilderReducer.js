import * as actionType from '../action/actionType';

const initialState = {
	ingredients: null,
    error:false,
    total_price: 5,
    building:false,
    INGREDIENTS_PRICE : {
        salad: 10,
        bacon: 15,
        cheese: 12,
        meat: 20,
    }
};


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientsName]:state.ingredients[action.ingredientsName] + 1
                },
                total_price:state.total_price + state.INGREDIENTS_PRICE[action.ingredientsName] ,
                building : true
            };
        case actionType.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientsName]:state.ingredients[action.ingredientsName] - 1,
                    building : true
                    

                },
                total_price:state.total_price - state.INGREDIENTS_PRICE[action.ingredientsName] 

            };

        case actionType.INIT_INGREDIENTS:{
            return{
                ...state,
                ingredients:action.ingredients,
                total_price:5,
                error:false,
                building : false
            }
        }
        case actionType.FAILED_INGREDIENTS:{
            return{
                ...state,
                error:true
            }
            
        }
            
            

		default:
			return state;
	}
};

export default reducer;
