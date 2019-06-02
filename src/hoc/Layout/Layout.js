import React, { Component } from 'react'
import Aux from '../AuxHoc/AuxHoc'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
//import * as actionTypes from '../../store/actions/actionTypes'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState)=> {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }
    render(){
       return (
        <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthinticated} />
            <SideDrawer open={this.state.showSideDrawer}  isAuth={this.props.isAuthinticated} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>{this.props.children}</main>
        </Aux> 
       )    
    }
}
const mapStateToProps = state => {
    return {
        isAuthinticated: state.auth.token !== null
    }
}
// const mapDispatchToProps = dispatch =>{
//     return {
//         onIngsAdd: (ingName) => dispatch(burgerBuilderActions.addIngrt(ingName)),
//         onIngsDel: (ingName) => dispatch(burgerBuilderActions.delIngrt(ingName)),
//         onIngsInit: () => dispatch(burgerBuilderActions.initIngrts()),
//         onInitPurchase: () => dispatch(burgerBuilderActions.purcaseInit())
//     }
// }

export default connect(mapStateToProps)(Layout)
