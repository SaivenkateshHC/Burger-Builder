import * as actionType from '../action/actionType'
import {updateUtility} from '../../Shared/utility'

const initialState={
    idToken:null,
    localId:null,
    error:null,
    loading:false,
    redirecting:'/'
}

const authStart =(state,action)=>{
    return updateUtility(state,{error:null ,loading:true})
}

const authSuccess = (state, action)=>{
    return updateUtility(state,{
        idToken:action.idToken,
        localId:action.localId,
        error:null,
        loading:false

    })
} 

const authFailed = (state,action)=>{
    return updateUtility(state, {error:action.error, loading:false})
}

const authLogout = (state,action)=>{
    return updateUtility(state, {idToken:null,localId:null})
}
const authRedirect = (state, action)=>{
    return updateUtility(state,{redirecting:action.path})
}

const authReducer=(state=initialState,action)=>{
   
    switch(action.type){
        case actionType.AUTH_START:{
            return authStart(state,action)
        }
        case actionType.AUTH_SUCCESS:{
            return authSuccess(state,action)
        }
        case actionType.AUTH_FAILED:{
            return authFailed(state,action)
        }
        case actionType.AUTH_LOGOUT:{
            return authLogout(state, action)
        }
        case actionType.SET_AUTH_REDIRECT:{
            return authRedirect(state,action)
        }
        default:{
            return state
        }
    }    
}

export default authReducer
