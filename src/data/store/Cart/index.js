// CartReducer
import { 
    CART_ADDED,
    CART_UPDATED,
    CART_REMOVED,
    CART_CLEARED
} from "./actionTypes"

export default function reducer(state = {
    items: [],
    total: 0,
    count: 0,
    waiter: 0,
    error: false

}, action) {
    
    let newCartItems = null, newTotalPrice = null

    switch (action.type)
    {
        case CART_ADDED:
            console.log("Store.Cart.CART_ADDED", action.payload)

            // get selected item for removal
            const { item: selectedItemToAdd, totalItemPrice } = action.payload
            
            // add new item 
            newCartItems = state.items.concat(selectedItemToAdd);
            newTotalPrice = state.total + totalItemPrice
            return { ...state, items: newCartItems, count: newCartItems.length, total: newTotalPrice }

        case CART_CLEARED:
            console.log("Store.Cart.CART_CLEARED", action.payload)
            return { items: [], count: 0, total: 0, waiter: 0, error: false }

        case CART_UPDATED:
            //const { waiter } = action.payload
            //console.log("Store.Cart.CART_UPDATED", action.payload)
            return { ...state, ...action.payload }

        case CART_REMOVED:
            console.log("Store.Cart.CART_REMOVED", action.payload)
            
            // get selected item for removal
            const { item: selectedItemToRemove } = action.payload
            const { optionSelected:selectedUIDToRemove } = selectedItemToRemove

            newCartItems = [...state.items];
            for (let i = newCartItems.length - 1; i >= 0; i--)
            {
                if (newCartItems[i].uid === selectedUIDToRemove)
                {
                    newTotalPrice = state.total - newCartItems[i].price
                    newCartItems.splice(i, 1)
                }
            }
            return { ...state, items: newCartItems, count: newCartItems.length, total: newTotalPrice }
        default:
    }

    return state
}