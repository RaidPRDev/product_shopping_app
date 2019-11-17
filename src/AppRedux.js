import React, { Component } from "react"
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { fetchUser } from "./data/store/Users/actions"
import { fetchProducts } from "./data/store/Products/actions"

import MainHeader from "./components/headers/MainHeader";
import ProductScreen from "./components/screens/ProductScreen";
import CheckoutScreen from "./components/screens/CheckoutScreen";
import CartScreen from "./components/screens/CartScreen";

import './theme/Index.scss'
import BraintreePaymentSDK from "./payment/BraintreePaymentSDK";

class AppRedux extends Component 
{
    constructor(props)
    {
        super(props)

        this.state = {
            isLoading: true
        }

        this.initializePaymentProcessor()
    }

    initializePaymentProcessor()
    {
        BraintreePaymentSDK.createClient({
            onCreate: (clientInstance) => 
            {
                this.onPaymentProcessorComplete()
            },
            onError: (clientError) => 
            {
                console.log("BraintreePaymentSDK.clientError", clientError)
            }
        })
    }

    onPaymentProcessorComplete()
    {
        this.props.dispatch(fetchUser())
        .then(() => 
        {
            console.log("fetchUser complete")

            this.props.dispatch(fetchProducts())
            .then(() => 
            {
                console.log("fetchProducts complete")

                this.setState({isLoading: false})
            })
        })
    }

    componentDidMount()
    {
        
    }

    render()
    {
        const { isLoading } = this.state

        return (
            <React.Fragment>
                {isLoading ? <div>Loading please wait...</div> 
                : <Router>
                    <div className="app-container">
                        <MainHeader />
                        
                        <Switch>
                            <Route 
                                path="/cart"
                                render={(props) => <CartScreen router={props} store={this.props} />}
                            />
                            <Route 
                                path="/checkout" 
                                render={(props) => <CheckoutScreen router={props} store={this.props} />}
                            />
                            <Route 
                                path="/" 
                                render={(props) => <ProductScreen router={props} store={this.props} />}
                            />
                        </Switch>
                    </div>
                </Router>}
            </React.Fragment>
        )
    }
}

export default connect((store) =>
{
    // map store to props
    return {
        user: store.profile.user,
        userFetched: store.profile.fetched,
        productsFetched: store.products.fetched,
        products: store.products.items.products,
        categories: store.products.items.categories,
        cart: store.cart
    }
}
)(AppRedux)