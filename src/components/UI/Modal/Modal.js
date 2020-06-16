import React from 'react';
import classes from '../Modal/Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary'

const modal=(props)=>{
	// shouldComponentUpdate(nextProps, nextState){
	// 	return nextProps.show !== props.show || nextProps.children !== props.children
	// }

	
	return (
		<Aux>
			<Backdrop show={props.show} close={props.closed} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100)',
					opacity: props.show ? '1' : '0',
				}}>
				{props.children}
			</div>
		</Aux>
	)
};

export default React.memo(modal,(prevProps,nextProps)=>{
	return nextProps.show === prevProps.show && nextProps.children === prevProps.children
});
