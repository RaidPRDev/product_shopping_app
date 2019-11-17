import { combineReducers } from "redux"

import profile from "./Users"
import products from "./Products"
import cart from "./Cart"

export default combineReducers({
    profile,
    products,
    cart
})
