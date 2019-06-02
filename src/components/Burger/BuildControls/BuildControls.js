import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
]
const buildControls = (props) => {
    return <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(el=><BuildControl 
                key={el.label} 
                label={el.label}
                added = {()=>props.ingredientAdded(el.type)}
                removed = {()=>props.ingredientRemoved(el.type)}
                disabled={props.disabled[el.type]}
                />)
        }
        <button 
        onClick={props.ordered}
        disabled={!props.purchasable} 
        className={classes.OrderButton}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
    </div>
}
export default buildControls