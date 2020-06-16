import React from'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary'
import useHttpErrorHandler from '../../Hooks/http-error-handler'

const withErrorHandler = (WrappedComponents, axios) => {

    return (props)=>{
        const [error,clearError] = useHttpErrorHandler(axios)
        return(
            <Aux>
                <Modal show={error}
                    close = {clearError}>
                    {error ? error.message:null}
                </Modal>
                <WrappedComponents  {...props}/>
    
            </Aux>
        )
        

    }

    

    

   
    
    
 
}
export default withErrorHandler
