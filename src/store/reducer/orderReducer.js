import * as actionType from '../action/actionType'

const initial_state={
    order:[],
    loading:false,
    purchased:false

}

const orderReducer = (state = initial_state, action)=>{
    switch(action.type){

        case actionType.PURCHASE_INIT:{
            return{
                ...state,
                purchased:false
            }
        }


        case actionType.PURCHASE_ORDER_START:{
            return{
                ...state,
                loading:true
            }
        }

        case actionType.PURCHASE_ORDER_SUCCESS:{
            const newState = {
                ...action.orderData,
                id:action.orderId
            }
            return{
                ...state,
                order:state.order.concat(newState),
                loading:false,
                purchased:true

            }

        }

        case actionType.PURCHASE_ORDER_FAILED:{
            return{
                ...state,
                loading:true

            }
        }

        case actionType.FETCH_ORDER_SUCCESS:{
            return{
                ...state,
                order:action.order,
                loading:false
            }
        }

        case actionType.FETCH_ORDER_FAILED:{
            return{
                ...state,
                loading:false
            }
        }
        case actionType.FETCH_ORDER_START:{
            return{
                ...state,
                loading:true
            }
        }
        default:
            return state


    }

}
export default orderReducer