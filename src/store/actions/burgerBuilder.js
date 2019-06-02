import * as actionTypes from './actionTypes'
import axios from '../../axios'
export const addIngrt = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const delIngrt = (name) =>{
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngrts = (ingrts) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingrts: ingrts
    }
}
export const fetchIngrtsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngrts = () => {
    return dispatch => {
        axios.get('https://react-kornilova-burger.firebaseio.com/ingredients.json').then(response => {
            dispatch(setIngrts(response.data))
            // this.setState({
            //     ingredients: response.data
            // })
        })
        .catch(errorr=>
            dispatch(fetchIngrtsFailed())
            //this.setState({ error: true })
            )

    }
}