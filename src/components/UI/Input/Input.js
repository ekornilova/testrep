import React from 'react'
import classes from './Input.css'
const input = (props) =>{
    let el = null
    const inputClasses=[classes.InputElement]
    let validationError = null;
    if (props.inValid && props.shouldValidate && props.touched){
            inputClasses.push(classes.Invalid)
            validationError = <p>Please enter a valid value!</p>;
    }

    switch (props.elementType) {
        case ('input'):
            el = <input className={inputClasses.join(' ')}
             {...props.elementConfig}
              value={props.value} 
              onChange={props.changed}
              />
            break;
        case ('textarea'):
            el=<textarea  className={classes.InputElement}
             {...props.elementConfig}
              value={props.value} 
              onChange={props.changed}
              />
            break;
        case ('select'):
            el=<select  
            className={classes.InputElement}            
            value={props.value}
            onChange={props.changed}
            >
            {props.elementConfig.options.map(op=><option key={op.value}>{op.displayValue}</option>)}
            </select>
            break;    
        default: el = <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value} />

    }
    return (
        <div  className={classes.Input}>
        <label  className={classes.Label}>{props.label}</label>
        {el}
    </div>
    )
}
export default input