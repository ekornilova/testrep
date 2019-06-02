import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/AuxHoc/AuxHoc'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actionTypes from '../../store/actions'


 class BurgerBuilder extends Component {
    //  constructor(props){
    //      super(props);
    //      this.state={}
    //  }
    state = {
        //ingredients: null,
        // {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },//
        //totalPrice: 4,
        //purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
     
    componentDidMount(){
        // axios.get('https://react-kornilova-burger.firebaseio.com/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     })
        // })
        // .catch(errorr=>this.setState({ error: true }))
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => sum +el , 0)
        // this.setState({
        //     purchasable: sum > 0
        // })
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // const queryParams = []
        // for (let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        // }
        // queryParams.push('price='+this.props.ttlPrice)
        // const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
           // search: '?' + queryString
        })

        //alert('you continue')
    }

    // addIngregientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients =  {
    //         ...this.props.ings,

    //     }
    //     updatedIngredients[type] = updatedCounted
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }
    // removeIngregientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount <= 0)
    //         return
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredients =  {
    //         ...this.props.ings,

    //     }
    //     updatedIngredients[type] = updatedCounted
    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }
     render(){
         const disabledInfo = {
             ...this.props.ings
         } 
         for (let key in disabledInfo){
             disabledInfo[key] = disabledInfo[key] <= 0 
         }
         
         // {salad: true, meat: false, ...}
         let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
         let orderSummary = null
         if (this.props.ings){
            burger = <Aux>
            <Burger ingredients={this.props.ings}/>
                <BuildControls 
                   price={this.props.ttlPrice}
                   ingredientAdded={this.props.onIngsAdd}
                   ingredientRemoved={this.props.onIngsDel}
                   disabled={disabledInfo}
                   purchasable={this.updatePurchaseState(this.props.ings)}
                   ordered={this.purchaseHandler}
                />
        </Aux>
            orderSummary =  <OrderSummary  ingredients={this.props.ings}  purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.ttlPrice}
            />
         }
             
         if (this.state.loading){
            orderSummary = <Spinner />
        }
         return (
             <Aux>
                 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                 </Modal>
                 {burger}
             </Aux>
             
         );
     }
 } 
 const mapStateToProps = state => {
     return {
         ings: state.ingredients,
         ttlPrice: state.totalPrice
     }
 }
 const mapDispatchToProps = dispatch =>{
     return {
         onIngsAdd: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
         onIngsDel: (ingName) => dispatch({type: actionTypes.DELETE_INGREDIENT, ingredientName: ingName})
     }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))