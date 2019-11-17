import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { fetchUser } from "../../data/store/Users/actions"
import { fetchProducts } from "../../data/store/Products/actions"

import ProductScreen from "../../components/screens/ProductScreen";
import CheckoutScreen from "../../components/screens/CheckoutScreen";
import CartScreen from "../../components/screens/CartScreen";

class HomeScreen extends Component
{
    constructor(props)
    {
        super(props);

        console.log("HomeScreen.props", props)

        this.state = {}
    }

    componentDidMount()
    {
        const { match } = this.props.router

        if (match.params.id)
        {
            console.log("ID found", match.params.id)

            if (match.params.id === "rafael")
            {
                this.id = match.params.id
                console.log("GETTING USERDATA", match.params.id)
                
                this.props.store.dispatch(fetchUser())
                this.props.store.dispatch(fetchProducts())

            }
        }
    }

    render() 
    {
        const { router, store } = this.props

        const { userFetched, productsFetched } = store

        if (!userFetched || !productsFetched) return (<div>Loading....</div>)

        return (
            
            <Router>
                <Switch>
                    <Route 
                        path="/:id" 
                        render={(props) => <ProductScreen router={props} store={store} />}
                    />
                    <Route 
                        path="/:id/cart"
                        render={(props) => <CartScreen router={props} store={store} />}
                    />
                    <Route 
                        path="/:id/checkout" 
                        render={(props) => <CheckoutScreen router={props} store={store} />}
                    />
                    <Route render={ () => <h1>404 Error</h1> } />
                </Switch>
            </Router>
        )
    }
}

export default HomeScreen