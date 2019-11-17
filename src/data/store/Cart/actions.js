import { 
    CART_GET,
    CART_ADDED,
    CART_UPDATED,
    CART_REMOVED,
    CART_CLEARED
} from "./actionTypes"

export function fetchCart()
{
    return function(dispatch) 
    { 
        console.log("fetchCart", dispatch)
       
        dispatch({type: CART_GET})
    }
}

export function addToCart(productData)
{
    return function(dispatch) 
    { 
        console.log("addToCart", productData)
       
        dispatch({type: CART_ADDED, payload: productData})
    }
}

export function updateCart(productData)
{
    return function(dispatch) 
    { 
        console.log("updateCart", productData)
       
        dispatch({type: CART_UPDATED, payload: productData})
    }
}

export function removeFromCart(productData)
{
    return function(dispatch) 
    { 
        console.log("removeFromCart", productData)
       
        dispatch({type: CART_REMOVED, payload: productData})
    }
}

export function clearCart()
{
    return function(dispatch) 
    { 
        console.log("clearCart")
       
        dispatch({type: CART_CLEARED, payload: null})
    }
}
