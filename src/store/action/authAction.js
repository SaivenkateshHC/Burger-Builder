import * as actionType from './actionType';
import axios from 'axios'


export const auth_start = () => {

	return {
		type: actionType.AUTH_START,
	};
};

export const auth_success = (idToken, localId) => {
	return {
		type: actionType.AUTH_SUCCESS,
		idToken: idToken,
		localId: localId,
	};
};
export const auth_failed = (error) => {
	return {
		type: actionType.AUTH_FAILED,
		error: error,
	};
};

export const logout = () => {
	
	localStorage.removeItem('idToken')
	localStorage.removeItem('localId')
	localStorage.removeItem('expirationDate')
	return{
		type: actionType.AUTH_LOGOUT,
	}
	

};

export const auth_logout = (expirationDate) => {
	return dispatch=>{
		setTimeout(() => {
            dispatch(logout());
        }, expirationDate * 1000);	
	};
};
export const auth = (email, password, isSignUp, expiresIn) => {
	return dispatch => {
        dispatch(auth_start());
        const authData = {
            email: email,
			password: password,
			expiresIn:expiresIn,
            returnSecureToken: true
        };
        let url = ``;

 		if (!isSignUp) {
 			url = ``;
 		}
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(auth_success(response.data.idToken, response.data.localId));
                dispatch(auth_logout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(auth_failed(err.response.data.error));
            });
    };
};

export const set_auth_redirect = (path) => {
	return {
		type: actionType.SET_AUTH_REDIRECT,
		path: path,
	};
};

export const auth_check_state=()=>{

	return dispatch=>{
		const idToken=localStorage.getItem('idToken')
		
		if(idToken!=null){
			

			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			
			if(expirationDate > new Date()){
				const localId = localStorage.getItem('localId')
				
				dispatch(auth_success(idToken,localId))
				dispatch(auth_logout((expirationDate.getTime() - new Date().getTime() )/1000))
			}
			else{
				return dispatch(logout())

			}
		}
		else{
			dispatch(logout())

			
				
			

		}
	}
}