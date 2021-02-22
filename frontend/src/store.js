import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productCreateReducer, productCreateReviewReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer, TopProductsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer, userUpdateUsReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productCreateReview:productCreateReviewReducer,
    topProducts:TopProductsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderList:orderListReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderListMy:orderListMyReducer,
    userUpdateUs:userUpdateUsReducer

})
const cartItemsStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState={
    cart:{cartItems:cartItemsStorage,
    shippingAddress:shippingAddressStorage},
    userLogin:{userInfo:userInfoStorage},

}
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store