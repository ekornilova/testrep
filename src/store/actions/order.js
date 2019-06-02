import * as actionTypes from './actionTypes'
import axios from '../../axios'
export const purcaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purcaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error,
    }
}

export const purcaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}
export const purcaseBurger = (orderData, token) => {
    return dispatch => {
        purcaseBurgerStart()

        axios.post('/orders.json?auth=' + token,orderData)
        .then(response => {
            console.log(response.data)
            dispatch(purcaseBurgerSuccess(response.data.name, orderData))
            // this.setState({ loading: false, 
            // purchasing: false
            // })
            // this.props.history.push('/')
            // console.log('response',response)
        }) 
        .catch(error => {
            // this.setState({ loading: false, 
            //     purchasing: false })
            // console.log('error',error)
            dispatch(purcaseBurgerFailed(error))
        })
    }

}
export const purcaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams).then(response => {
            const fetchedOrders = []
            for (let key in response.data){
                fetchedOrders.push( {
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
            // this.setState({
            //     orders: fetchedOrders,
            //     loading: false

            // })
        })
        .catch(errorr=>dispatch(fetchOrderFail(errorr))
            //this.setState({ error: true, loading: false })
            )
    }
}