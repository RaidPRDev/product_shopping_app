// Products Reducer
import { 
    PRODUCTS_RECEIVE_PENDING,
    PRODUCTS_RECEIVE_FULFILLED,
    PRODUCTS_RECEIVE_REJECTED,
    PRODUCTS_UPDATE

} from "./actionTypes"

export default function reducer(state = {
    items: [],
    fetching: false,
    fetched: false,
    error: false

}, action) {
    

    switch (action.type)
    {
        case PRODUCTS_RECEIVE_PENDING:
            return { ...state, fetching: true }

        case PRODUCTS_RECEIVE_FULFILLED:
            return { 
                ...state, 
                fetching: false, 
                fetched: true, 
                items: action.payload 
            }

        case PRODUCTS_RECEIVE_REJECTED:
            return { ...state, fetching: false, error: action.payload }

        case PRODUCTS_UPDATE:
            return { ...state, items: action.payload }
        
        default:
    }

    return state
}