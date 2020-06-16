import * as actionType from './actionType';
import axios from '../../axios-order';

export const purchase_order_success = (id, orderData) => {
	return {
		type: actionType.PURCHASE_ORDER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const purchase_order_failed = (error) => {
	return {
		type: actionType.PURCHASE_ORDER_FAILED,
		error: error,
	};
};
const purchase_order_start = () => {
	return {
		type: actionType.PURCHASE_ORDER_START,
		// loading:loading
	};
};
export const purchase_order = (orderData,idToken) => {
	return (dispatch) => {
		dispatch(purchase_order_start());
		axios
			.post('order.json?auth='+idToken, orderData)
			.then((response) => {
				dispatch(purchase_order_success(response.data.name, orderData));
			})
			.catch((error) => {
				dispatch(purchase_order_failed(error));
			});
	};
};
export const purchase_init = () => {
	return {
		type: actionType.PURCHASE_INIT,
	};
};

export const fetch_order_success = (order) => {
	return {
		type: actionType.FETCH_ORDER_SUCCESS,
		order: order,
	};
};

export const fetch_order_failed = (error) => {
	return {
		type: actionType.FETCH_ORDER_FAILED,
		error: error,
	};
};

export const fetch_order_start = () => {
	return {
		type: actionType.FETCH_ORDER_START,
	};
};

export const fetch_order = (idToken, localId) => {

	const queryParams = '?auth='+idToken+'&orderBy="localId"&equalTo="' + localId + '"';

	return (dispatch) => {
		dispatch(fetch_order_start());
		axios
			.get('/order.json'+ queryParams)
			.then((res) => {
				const fetchedOrder = [];
				// console.log(res.data);
				for (let key in res.data) {
					fetchedOrder.push({
						...res.data[key],
						id: key,
					});
				}
				dispatch(fetch_order_success(fetchedOrder));
				//  this.setState({loading:false ,order:fetchedOrder})
			})
			.catch((err) => {
				dispatch(fetch_order_failed(err));
			});
	};
};
