import React from 'react'
import classes from '../Input/Input.module.css'

const Input = (props) => {
    let inputClasses = [classes.InputElement]
    let inputElement = null

    if(props.invalid && props.shouldValidate && props.touch){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case('input'):
            inputElement=<input className={inputClasses.join(' ')}{...props.elementConfig} value={props.value} onChange={props.change}/>
           
            break
        case('textArea'):
            inputElement=<textarea className={inputClasses}{...props.elementConfig} value={props.value} onChange={props.change}/>
            break
        case('select'):
            inputElement=<select 
                            className={inputClasses}
                            onChange={props.change}
                            >
                                {props.elementConfig.options.map(option=>{
                                return(<option key={option.value} value={option.value}>{option.display_value} </option>)
                                      } 
                                 )
                            
                                }

                        </select>
            break
        default:
            inputElement=<input className={inputClasses}{...props.elementConfig} value={props.value}/>
        

        
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            
        </div>
    )
}

export default Input
