import { compose, createStore, applyMiddleware } from 'redux';
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducers from "./store/ReduxReducers"

export default (initialState) => 
{
  // localStorage.clear();
  // window.localStorage.removeItem('state');

  initialState = JSON.parse(window.localStorage.getItem('state')) || initialState;
  
  const middleware = [promise, thunk, logger];
 
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware)
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      // window.__REDUX_DEVTOOLS_EXTENSION__() 
    )
  );

  store.subscribe(() => {
    const state = store.getState();
    // console.log("STORE.STATE", state)

    const persist = {
      cart: state.cart
    }

    window.localStorage.setItem('state', JSON.stringify(persist));

  })

  return store;
}
