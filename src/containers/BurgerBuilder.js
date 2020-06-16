import React, { useEffect,useState } from 'react';
import {connect} from 'react-redux'
import * as BurgerBuilderActions from '../store/action/index'



import Aux from '../hoc/Auxillary';
import Burger from '../components/Burger/Burger';
import BurgerControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import axios from '../../src/axios-order';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';




const burgerBuilder=(props)=> {
	// constructor(){
	// 	super(props)
	// 	this.state =
	// }

	// eslint-disable-next-line 
	const [confrimOrder, setConfrimOrder]= useState(false)
	// eslint-disable-next-line 
	const [loading, setLoading]= useState(false)

	const {onInitIngredients}= props
	// eslint-disable-next-line 
	useEffect(() => {
		onInitIngredients()
		// eslint-disable-next-line 
	}, [onInitIngredients])

	
	const updatePurchase=(ingredients)=> {
		const sum = Object.keys(ingredients)
			.map((ingkey) => {
				return ingredients[ingkey];
			})
			.reduce((sum, ele) => {
				return sum + ele;
			}, 0);
		// this.setState({purchasable: sum > 0 })	
		return( sum > 0);
	}

	// addIngredients = (types) => {
	// 	const oldCount = this.state.ingredients[types];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients,
	// 	};
	// 	updatedIngredients[types] = updatedCount;
	// 	const priceValue = INGREDIENTS_PRICE[types];
	// 	const oldPrice = this.state.total_price;
	// 	const priceAddition = oldPrice + priceValue;

	// 	this.setState({
	// 		total_price: priceAddition,
	// 		ingredients: updatedIngredients,
	// 	});
	// 	this.updatePurchase(updatedIngredients);
	// };

	// removeIngredients = (types) => {
	// 	const oldCount = this.state.ingredients[types];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients,
	// 	};
	// 	updatedIngredients[types] = updatedCount;
	// 	const priceValue = INGREDIENTS_PRICE[types];
	// 	const oldPrice = this.state.total_price;
	// 	const priceDediction = oldPrice - priceValue;

	// 	this.setState({
	// 		total_price: priceDediction,
	// 		ingredients: updatedIngredients,
	// 	});
	// 	this.updatePurchase(updatedIngredients);
	// };

	const orderConformation = () => {

		if(props.isAuthenticated){
			
			setConfrimOrder(true)
		}else{
		
			props.onRedirect('/checkout/')
			props.history.push('/auth')
		
		}
		
		
	};
	const cancelOrder = () => {
		setConfrimOrder(false)
		
	};
	const continueOrder = () => {
		//customer details are hardcoded

		// this.setState({ loading: true, purchasable: false });
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.total_price,
		// 	customer: {
		// 		name: '',
		// 		address: '',
		// 		email: '',
		// 	},
		// 	delivery_type: 'cash',
		// };
		// axios
		// 	.post('order.json', order)
		// 	.then((response) => {
		// 		this.setState({ loading: false, purchasable: true });
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ loading: false, purchasable: true });
		// 	});

		// alert('your order is submitted');

		// using query params

		// const queryParams = []
		// for(let i in this.state.ingredients ){
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		// }
		
		// queryParams.push('price=' + this.state.total_price)
		// const queryString = queryParams.join('&')
		// props.history.push({
		// 	pathname:'/checkout/',
		// 	search: '?'+ queryString
			
		// })
		// console.log(queryString)


		//after using redux
		props.onPurchaseInit()
		
		props.history.push('/checkout/')
	};

	
	const disabledInfo = {
		...props.ings,
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}
	let orderSummary = null;

	let burger = props.error ? (
		<p>ingredients failed to load</p>
	) : (
		<Spinner />
	);

	if (props.ings) {
		burger = (
			<Aux>
				<Burger ingredients={props.ings} />
				<BurgerControls
					addingIngredient={props.onAddIngredients}
					removingIngredient={props.onRemoveIngredients}
					disabled={disabledInfo}
					purchasable={updatePurchase(props.ings)}
					ordering={orderConformation}
					auth = {props.isAuthenticated}
					price={props.price}
				/>
			</Aux>
		);
	orderSummary = (
		<OrderSummary
			price={props.price}
			ingredients={props.ings}
			cancelling={cancelOrder}
			continuing={continueOrder}
		/>
	);
	}

	if (loading) {
		orderSummary = <Spinner />;
	}

	return (
		<Aux>
			<Modal show={confrimOrder} closed={cancelOrder}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
	
}

const mapStateToProps =(state)=> {
	return{
		ings: state.burgerBuilder.ingredients,
		price : state.burgerBuilder.total_price,
		error: state.burgerBuilder.error,
		isAuthenticated : state.auth.idToken != null
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		onAddIngredients:(ingi)=>dispatch(BurgerBuilderActions.addIngredients(ingi)),
		onRemoveIngredients:(ingi)=>dispatch(BurgerBuilderActions.removeIngredients(ingi)),
		onInitIngredients:()=>dispatch(BurgerBuilderActions.init_ingredients()),
		onPurchaseInit:()=>dispatch(BurgerBuilderActions.purchase_init()),
		onRedirect:(path)=>dispatch(BurgerBuilderActions.set_auth_redirect(path))
	}
}


export default connect( mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
