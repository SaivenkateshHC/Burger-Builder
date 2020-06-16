import React, { useEffect } from 'react'

import * as action from '../../../store/action/index'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const logout=(props)=> {
    const {logout}=props
    // eslint-disable-next-line 
    useEffect(() => {
        logout()
       // eslint-disable-next-line 
    }, [logout])
    

    

        return <Redirect to="/"/>
    
}

const mapDispatchToProps = (dispatch)=>{
    return{
        logout:()=>dispatch(action.logout())
    }
}
export default connect(null,mapDispatchToProps)(logout)
