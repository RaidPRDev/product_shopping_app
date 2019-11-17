import { 
    USER_RECEIVE_FULFILLED,
    USER_SET_USERNAME,
    USER_SET_NAME,
    USER_SET_EMAIL

} from "./actionTypes"

export function fetchUser()
{
    return function(dispatch) 
    { 
        return new Promise((resolve, reject) => 
        {
            dispatch({type: USER_RECEIVE_FULFILLED, payload: {
                username: "johnc",
                name: "John Cusack",
                age: 58,
                email: "fania@raidpr.com"
            }})

            resolve()
        })    
    }

    /*return {
        type: USER_RECEIVE_FULFILLED,
        payload: {
            username: "johnc",
            name: "John Cusack",
            age: 58,
            email: "fania@raidpr.com"
        }
    }*/
}

export function setUserName(username)
{
    return {
        type: USER_SET_USERNAME,
        payload: username
    }
}

export function setName(name)
{
    return {
        type: USER_SET_NAME,
        payload: name
    }
}

export function setEmail(email)
{
    return {
        type: USER_SET_EMAIL,
        payload: email
    }
}