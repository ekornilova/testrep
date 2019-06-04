import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'
// import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
const asyncCheckout = asyncComponent(() =>{
  return import('./containers/Checkout/Checkout')
}) 

const asyncOrders = asyncComponent(() =>{
  return import('./containers/Orders/Orders')
}) 

const asyncAuth = asyncComponent(() =>{
  return import('./containers/Auth/Auth')
}) 

const asyncLogout = asyncComponent(() =>{
  return import('./containers/Auth/Logout/Logout')
}) 
const asyncBurgerBuilder = asyncComponent(() =>{
  return import('./containers/BurgerBuilder/BurgerBuilder')
}) 

class App extends Component {
  // state = {
  //   show: true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({ show: false })
  //   }, 5000)
  // }
  componentDidMount(){
    this.props.onTryAuth()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' exact component={asyncBurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    if (this.props.isAuthinticated){
      routes = (
        <Switch>            
            <Route path='/checkout' component={asyncCheckout}/>
            <Route path='/orders' component={asyncOrders}/>
            <Route path='/logout' component={asyncLogout}/>
            <Route path='/auth' component={asyncAuth}/>
            <Route path='/' exact component={asyncBurgerBuilder}/>
            <Redirect to="/" />
          </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthinticated: state.auth.token !== null
  }
}
const mapDispatchToProps= dispatch => {
  return {
      onTryAuth: () => dispatch(actions.authCheckState())

  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

