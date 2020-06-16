import {useEffect, useState} from 'react'

export default httpClients=>{
    // eslint-disable-next-line 
    const [error,setError] = useState(null)
    
    
        const reqInterceptor=httpClients.interceptors.request.use(req=>{
            
            setError(null)
            
            return req
        })
        const resInterceptor = httpClients.interceptors.response.use(res=>res,err=>{
            
            setError(err)
            
        })
        
    
    // eslint-disable-next-line 
    useEffect(() => {
        httpClients.interceptors.request.eject(reqInterceptor)
        httpClients.interceptors.response.eject(resInterceptor)
        // eslint-disable-next-line 
    }, [])

    const ConfrimedError=()=>{
        
        setError(null)
        
    }
    return[error,ConfrimedError]
}
