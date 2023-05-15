import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rollsReducer, rollDetailsReducer } from './reducers/rollReducers'
import {authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers';
const reducer = combineReducers({
    rolls: rollsReducer,
    rollDetails: rollDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk];
const store = legacy_createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store