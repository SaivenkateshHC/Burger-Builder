// import delay from 'redux-saga'
// import {put} from 'redux-saga/effects'
// import axios from 'axios';
// import * as actions from '../action/index'

// export function* logoutSaga(action){
//     yield localStorage.removeItem('idToken')
// 	yield localStorage.removeItem('localId')
//     yield localStorage.removeItem('expirationDate')
//     yield put(actions.saga_logout())
// }

// export function* auth_logoutSaga(action){

//     yield delay(actions.auth_logout.expirationDate*1000)
//     yield put(actions.logout)
    
// }

// export function* auth_userSaga(action){
//     yield put(actions.auth_start());
// 		const authData = {
// 			email: action.email,
// 			password: action.password,
// 			returnSecureToken: true,
//             expiresIn: action.expiresIn,
            
// 		};
// 		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl_x6X2y7m9no7obWKcY3i_cW8LAaishc`;

// 		if (action.isSignUp) {
// 			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCl_x6X2y7m9no7obWKcY3i_cW8LAaishc`;
// 		}
//         try{
// 		const response = yield axios.post(url, authData)
			
//         const expirationDate = new Date(
//             new Date().getTime() + response.expiresIn * 1000
//             );
//         yield localStorage.setItem("idToken",response.idToken);
//         yield localStorage.setItem("localId",response.localId);
//         yield localStorage.setItem('expirationDate',expirationDate);
	
//         yield put(actions.auth_success(response.idToken, response.localId));
//         yield put(actions.auth_logout(response.expiresIn));
//         }
//         catch(error){
//             yield put(actions.auth_failed(error.response.data.error))
//         }	
			

// }
// export function* auth_check_saga(action){
    
// 		const idToken=yield localStorage.getItem('idToken')
		
// 		if(idToken!=null){
			

// 			const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
			
// 			if(expirationDate > new Date()){
// 				const localId = yield localStorage.getItem('localId')
				
// 				yield put(actions.auth_success(idToken,localId))
// 				yield put(actions.auth_logout((expirationDate.getTime() - new Date().getTime() )/1000))
// 			}
// 			else{
// 				return yield put(actions.logout())

// 			}
// 		}
// 		else{
// 		    yield put(actions.logout())

			
				
			

// 		}
	
// }