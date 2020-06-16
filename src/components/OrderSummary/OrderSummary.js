import React from 'react';
import Aux from '../../hoc/Auxillary';
import Button from '../UI/Button/Button'

const OrderSummary = (props) => {
	const ingrSummary = Object.keys(props.ingredients).map((ingkey) => {
		return (
			<li key={ingkey}>
				<span style={{ textTransform: 'capitalize' }}>{ingkey}</span>:
				{props.ingredients[ingkey]}
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your Orders</h3>
			<p>Ingredients for your tasty Burger:</p>
			<ul>{ingrSummary}</ul>
			<p>Do you wanna continue?</p>
			
			<p><strong>Total price  {props.price} Rs. only</strong></p>
			<Button btnType="Danger" clicked={props.cancelling}>CANCEL</Button>
			<Button btnType="Success" clicked={props.continuing}>CONTINUE</Button>
		</Aux>
	);
};

export default OrderSummary;
