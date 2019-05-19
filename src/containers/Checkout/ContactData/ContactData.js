import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
    state= {
        name: '',
        email: '',
        address: {
             street: '',
             postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault()
        console.log('orderHandler',this.props.ingredients)
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            // customer: {
            //     name: 'Kate',
            //     address: {
            //         street: 'Fuchika',
            //         xipCode: '420121',
            //         country: 'Russia'
            //     },
            //     email:'shmatia@mail.ru'
            // },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({ loading: false, 
            purchasing: false
            })
            this.props.history.push('/')
            console.log('response',response)
        }) 
        .catch(error => {
            this.setState({ loading: false, 
                purchasing: false })
            console.log('error',error)
        })
    }
    render(){
        let form = (<form >
            <input className={classes.Input} type='text' name='name' placeholder='Your name'/>
            <input className={classes.Input} type='text' name='email' placeholder='Your email'/>
            <input className={classes.Input} type='text' name='street' placeholder='Your street'/>
            <input className={classes.Input} type='text' name='postalCode' placeholder='Your postal code'/>
            <Button btnType='Success' clicked = {this.orderHandler}>ORDER</Button>
        </form>)
        if (this.state.loading)
            form = <Spinner />
       return (
           <div className={classes.ContactData}>
               <h4>Enter your Contact Data</h4>
               {form}
           </div>
       ) 
    }
}
export default ContactData