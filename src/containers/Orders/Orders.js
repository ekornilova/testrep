import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import { connect } from 'react-redux'
import * as orderActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount(){
        this.props.onFetchOrders()
        // axios.get('/orders.json').then(response => {
        //     const fetchedOrders = []
        //     for (let key in response.data){
        //         fetchedOrders.push( {
        //             ...response.data[key],
        //             id: key
        //         })
        //     }
        //     this.setState({
        //         orders: fetchedOrders,
        //         loading: false

        //     })
        // })
        // .catch(errorr=>this.setState({ error: true, loading: false }))
    }
    render(){
        //const orders = this.state.
        let orders = <Spinner />
        if (!this.props.loading)
            orders =  (<div>
                {this.props.orders.map(order =>
                     <Order key={order.id} price={order.price} ingredients={order.ingredients}/>)}
            </div>)
        return orders
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps= dispatch => {
    return {
        onFetchOrders: () => dispatch(orderActions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios))
