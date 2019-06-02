import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state= {
        name: '',
        email: '',
        address: {
             street: '',
             postalCode: ''
        },
        orderForm:{
                name:{
                    value: '',//'Kate',
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Your name'
                    },
                    validation:{
                        required:true
                    },
                    touched: false,
                    valid: false
                },
                    street: {
                        value: '',//''Fuchika',
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder: 'Your street'
                        },
                        validation:{
                            required:true
                        },
                        touched: false,
                        valid: false
                    },
                    zipCode: {
                        value: '',//''Fuchika',
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder: 'Your zipCode'
                        },
                        validation:{
                            required:true,
                            minLength: 5,
                            maxLength: 5
                        
                        },
                        touched: false,
                        valid: false
                    },
                    country: {
                        value: '',//''Fuchika',
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder: 'Your country'
                        },
                        validation:{
                            required:true
                        },
                        touched: false,
                        valid: false
                    },
                email: {
                    value: '',//''Fuchika',
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Your email'
                    },
                    validation:{
                        required:true
                    },
                    touched: false,
                    valid: false
                },
                deliveryMethod:{
                    value: 'cheapest',//''Fuchika',
                    elementType: 'select',
                    elementConfig:{
                        options:[
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    valid:true
                },
        },
        loading: false,
        formIsValid: false
    }

    checkValidaty(value,rules){
        let isValid= true
        if (!rules)
            return true
        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid

    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log('orderHandler',this.props.ingredients)
        this.setState({ loading: true })
        const formData ={}
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData:formData

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
    inputChangeHandler = (event, idEl) =>  {
        console.log(event.target.value)
        let updatedOrderForm = { ...this.state.orderForm }
        let updatedOrderFormEl = { ...updatedOrderForm[idEl] }
        updatedOrderFormEl.value = event.target.value
        updatedOrderFormEl.valid = this.checkValidaty( event.target.value,updatedOrderFormEl.validation )
        updatedOrderFormEl.touched = true
        
        updatedOrderForm[idEl] = updatedOrderFormEl    
        let formIsValid = true 
        for (let el in updatedOrderForm){
            formIsValid = updatedOrderForm[el].valid && formIsValid
        }    
        console.log('formIsValid',formIsValid)
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })        
    }
    render(){
        const arr = Object.keys(this.state.orderForm).map(el => {return {
            config: this.state.orderForm[el],
            id: el}
        })
        let form = (<form onSubmit={this.orderHandler}>
               {
                   arr.map(a=>
                   <Input key={a.id}  
                   value={a.config.value}
                   elementType={a.config.elementType} 
                   elementConfig={a.config.elementConfig}
                   changed={(event)=>this.inputChangeHandler(event,a.id)}
                   shouldValidate={a.config.validation}
                   inValid={!a.config.valid}
                   touched={a.config.touched}
                   />)
               } 
            
            <Button btnType='Success' disabled={!this.state.formIsValid} clicked = {this.orderHandler}>ORDER</Button>
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
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData)