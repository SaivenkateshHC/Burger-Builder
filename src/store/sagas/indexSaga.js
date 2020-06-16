import takeEvery from 'redux-saga'
import * as actionType from '../action/actionType'
import { logoutSaga,
        auth_logoutSaga, 
        auth_userSaga,
        auth_check_saga
    } from './authSaga'

import { init_ingredients_saga} from './burgerBuilderSaga'

export function* watchAuth(){
    yield takeEvery(actionType.AUTH_CHECK_SAGA,auth_check_saga)
    yield takeEvery(actionType.AUTH_TIMEOUT_SAGA,auth_logoutSaga)
    yield takeEvery(actionType.AUTH_USER_SAGA,auth_userSaga)
    yield takeEvery(actionType.INITIATE_LOGOUT,logoutSaga)
    
}

export function* watchBurger(){
    yield takeEvery(actionType.INIT_INGREDIENTS_SAGA,init_ingredients_saga)


}