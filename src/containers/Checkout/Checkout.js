import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

import {connect} from 'react-redux'
// import * as actionType from '../../store/action/index'

const checkout=(props)=> {

	// before using redux

	// state = {
    //     ingredients: null,
    //     price:null
	// };
	// UNSAFE_componentWillMount(){
	// 	const query = new URLSearchParams(props.location.search);
    //     const ingredients = {};
    //     let prices=0;
	// 	for (let param of query.entries()) {
    //         if(param[0]==='price'){
    //             prices = +param[1]
    //         } 
    //         else{
    //             ingredients[param[0]] = +param[1];
    //         }
			
	// 	}
	// 	this.setState({ ingredients: ingredients , price: prices });
	// 	console.log('object')
	// }


	const CancelHandler = () => {
		props.history.goBack();
	};
	const ContinueHandler = () => {
		props.history.replace('/checkout/contact-data');
	};
	

		let summary = <Redirect to='/'/>
		if(props.ings){
			const purchase=props.purchased?<Redirect to='/' />:null
			summary=(
				<div>
					{purchase}
					<CheckoutSummary
					ingredients={props.ings}
					CheckoutCancel={CancelHandler}
					CheckoutContinue={ContinueHandler}
					/>
					<Route path={props.match.path +'/contact-data'} 
				
				// before redux
                // render={(props)=>(
                //     <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />

				// )
				
				// after redux
				component={ContactData}

                

                 /> {/*end of router*/}
					
				</div>
			)
		}
		return summary
	
}

const mapStateToProps=(state)=>{
	return{
		ings: state.burgerBuilder.ingredients,
		purchased:state.order.purchased

	}
}

export default connect(mapStateToProps)(checkout);
