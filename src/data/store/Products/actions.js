// import axios from "axios"

import { 
    PRODUCTS_RECEIVE_FULFILLED,
    PRODUCTS_UPDATE

} from "./actionTypes"

import productsData from "../../providers/data/TempProductsData"

export function fetchProducts()
{
    return function(dispatch) 
    { 
        // console.log("fetchProducts", productsData)

        /*axios.get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            dispatch({type: LIST_RECEIVE_FULFILLED, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: LIST_RECEIVE_REJECTED, payload: err})
        })*/

        return new Promise((resolve, reject) => 
        {
            dispatch({type: PRODUCTS_RECEIVE_FULFILLED, payload: productsData})

            resolve()
        })        
    }
}

export function updateList(productsData)
{
    return {
        type: PRODUCTS_UPDATE,
        payload: productsData
    }
}
