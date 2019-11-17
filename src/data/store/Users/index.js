// UserReducer
import { 
    USER_RECEIVE_PENDING,
    USER_RECEIVE_FULFILLED,
    USER_RECEIVE_REJECTED,
    USER_SET_USERNAME,
    USER_SET_NAME,
    USER_SET_EMAIL

} from "./actionTypes"

export default function reducer(state = {
    user: {
        id: null,
        username: null,
        name: null,
        email: null
    },
    fetching: false,
    fetched: false,
    error: false

}, action) {

    switch (action.type)
    {
        case USER_RECEIVE_PENDING:
            return { ...state, fetching: true }

        case USER_RECEIVE_FULFILLED:
            return { 
                ...state, 
                fetching: false, 
                fetched: true, 
                user: action.payload 
            }

        case USER_RECEIVE_REJECTED:
            return { ...state, fetching: false, error: action.payload }

        case USER_SET_USERNAME:
            return { ...state, username: action.payload }

        case USER_SET_NAME:
            return { ...state, name: action.payload }

        case USER_SET_EMAIL:
            return { ...state, email: action.payload }
        
        default:
    }

    return state
}