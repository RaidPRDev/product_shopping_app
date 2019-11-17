import React, { Component } from "react"
import util from '../../utils/util';
import { getProductItem } from "../../utils/productTools"
import { getProductLevelOptionItemByOptionID, getProductExtraOptionItemByOptionID } from "../../utils/productTools"

import { clearCart } from "../../data/store/Cart/actions"

import Panel from "../controls/Panel";
import Label from "../controls/Label";
import Alignment from "../layout/Alignment";

import Layout from "../layout/Layout";
import Checkbox from "../controls/Checkbox";
import CheckoutSubHeader from "../headers/CheckoutSubHeader";
import TransactionResult from "../../payment/TransactionResult";
import OrderScreen from "./OrderScreen";

// Payment Buttons
import PayPalButton from "../../payment/components/PayPalButton";
import VenmoButton from "../../payment/components/VenmoButton";
import VisaCheckoutButton from "../../payment/components/VisaCheckoutButton";
import SecurePayButton from "../../payment/components/SecurePayButton";

export default class CheckoutScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            showCartList: false,
            orderComplete: false
        }

        this.cardInput = React.createRef()
        this.cardExpInput = React.createRef()
        this.cardCVCInput = React.createRef()

        this.secureButton = React.createRef()

        this.orderResultData = {}
    }

    componentDidMount()
    {
        this.targetElement = document.querySelector('body');
        this.targetElement.className = "app-container checkout"
    }

    handleCartListChange = (e) =>
    {
        const { isChecked } = e
        this.setState({showCartList: isChecked})
    }

    render() 
    {
        const { cart, products } = this.props.store
        const { history } = this.props.router
        const { showCartList, orderComplete } = this.state
        
        if (products === undefined) 
        {
            return (<div>Loading....</div>)
        }

        // calculate total 
        let cartTotal = cart.total
        let countTotal = cart.count > 1 ? cart.count + " Items" : cart.count + " Item"
        
        let cartItems = null, cartListClasses = ""

        if (showCartList)
        {
            cartListClasses = " show"
            // create cart list
            cartItems = cart.items.map((cartItem) => 
            {
                const product = getProductItem(cartItem, products)
                
                // gte product and distribute props
                // let productThumb = product.images[0].small
                let productName = product.name
                let productPrice = parseFloat(product.price)

                // get level option selected
                let levelOptionSelectedID = parseInt(cartItem.optionSelected)
                let levelOptionLabel = getProductLevelOptionItemByOptionID(product, levelOptionSelectedID)

                // parse extra options and get extra options selected
                let selectedExtraOptions = []
                let totalItemPrice = productPrice
                for (let key in cartItem.extraOptionSelected)
                {
                    let extraOptionID = parseInt(key.split("_")[1])
                    let selectedExtraOptionItem = getProductExtraOptionItemByOptionID(product, extraOptionID)
                    totalItemPrice += parseFloat(selectedExtraOptionItem.price)
                    selectedExtraOptions.push(selectedExtraOptionItem.name)
                }

                // parse selected extra options 
                let selectedExtraOptionsLabel = (selectedExtraOptions.length > 0) 
                ? ", " + selectedExtraOptions.join(', ') 
                : ""

                return (
                    <tr key={util.getUniqueString()} className="cart-table-row">
                        <td className="cart-table-column">
                            <div className="product-name">{productName}</div>
                            <div className="product-options">{levelOptionLabel + selectedExtraOptionsLabel}</div>
                        </td>
                        <td className="product-price">${util.formatPrice(totalItemPrice)}</td>
                    </tr>
                )
            });
        }

        // get waiter tip and add total
        const waiterTotal = cart.waiter
        cartTotal += waiterTotal
        if (waiterTotal > 0 && cartItems)
        {
            cartItems.push(
                <tr key={util.getUniqueString()} className="cart-table-row no-bottom-border">
                    <td className="cart-table-column">
                        <div className="product-name">{"Waiter Tip"}</div>
                    </td>
                    <td className="product-price">${util.formatPrice(waiterTotal)}</td>
                </tr>
            )
        }
        
        return (!orderComplete) ? (
        <React.Fragment>
            <CheckoutSubHeader history={history} />
            <Panel classes="ui-screen checkout-list">

                <Panel classes="checkout-cart-list-panel" height="40px" layout={Layout.HORIZONTAL} alignment={Alignment.HORIZONTAL_SPACED}>
                    <Label classes="checkout-title" text={"Shopping Cart ( " + countTotal + " )"}></Label>
                    <Checkbox name="show-cart-button" label="" classes="cart-open" handleCheckboxChange={this.handleCartListChange} />
                </Panel>
                <Panel classes={"checkout-cart-list-items" + cartListClasses}>
                    <table className="cart-table">
                        <tbody className="cart-table-body">
                            {cartItems}
                        </tbody>
                    </table>
                    
                </Panel>

                <Label classes="checkout-total" text={"Total: $" + util.formatPrice(cartTotal)}></Label>
                
                <Panel classes="checkout-payment-panel" title="We accept all major credit cards">
                    <Panel id={"credit-input"} classes={"credit-input"} layout={null}>
                        
                        <div id="cardnumber" className="text-input card">
                            <span className="text-input-label">{"Card Number"}</span>
                        </div>
                        <div id="exp-date" className="text-input exp">
                            <span className="text-input-label">{"Expiration"}</span>
                        </div>
                        <div id="cvc" className="text-input cvc">
                            <span className="text-input-label">{"CVC"}</span>
                        </div>

                    </Panel>
                    <SecurePayButton classes="process-pay-button" 
                        ref={this.secureButton}
                        label="Process Secure Pay" 
                        icon="images/payment/process_payment_icon.png"
                        cartTotal={cartTotal} 
                        onValidityChange={this.onValidityChange}
                        onTransactionResult={this.onTransactionResult}
                    />
                    
                </Panel>
                
                <Panel classes="pay-button-panel">
                    <VenmoButton classes="venmo-pay-button" 
                        icon="images/payment/venmo_logo.png" 
                        iconAlignment={Alignment.CENTER}
                        allowNewBrowserTab={false}
                        cartTotal={cartTotal}
                        onTransactionResult={this.onTransactionResult}
                    />
                </Panel>

                <Panel classes="pay-button-panel">
                    <PayPalButton id="paypal-button" 
                        classes="paypal-pay-button"
                        cartTotal={cartTotal} 
                        onTransactionResult={this.onTransactionResult}
                    />
                </Panel>

                <Panel classes="pay-button-panel">
                    <VisaCheckoutButton classes="visa-pay-button" 
                        icon="images/payment/visa_pay_logo.png" 
                        iconAlignment={Alignment.CENTER_LEFT}
                        cartTotal={cartTotal} 
                        onTransactionResult={this.onTransactionResult}
                    />
                </Panel>
                
            </Panel>
        </React.Fragment>
        ) 
        : <OrderScreen orderResultData={this.orderResultData} onClose={this.onOrderScreenClose} ></OrderScreen>
    }

    onValidityChange = (event) => 
    {
        var field = event.fields[event.emittedBy];
        //console.log("onValidityChange().event", event)
        //console.log("onValidityChange().field", field)

        const { container:{ id } } = field
        switch (id) 
        {
            case "cardnumber":
                if (field.isValid) this.secureButton.current.setFocus('expirationDate')
                break;
            case "exp-date":
                if (field.isValid) this.secureButton.current.setFocus('cvv')
                break;
            case "cvc":
                if (field.isValid) document.getElementById('root').focus();
                break;
            default:
        }
    }

    // Tiggered when payment process has started
    onTransactionResult = (response) =>
    {
        console.log("onTransactionResult().response", response)

        const { result } = response

        switch (result)
        {
            case TransactionResult.APPROVED:
                this.orderResultData = response
                this.setState({orderComplete: true})
                break;
            case TransactionResult.CANCELED:
                this.orderResultData = response
                this.setState({orderComplete: true})
                break;
            case TransactionResult.ERROR:
                this.orderResultData = response
                this.setState({orderComplete: true})
                break;
            default:
        }
    }

    // Tiggered after payment has been processed
    onOrderScreenClose = (orderResultData) =>
    {
        console.log("onOrderScreenClose().orderResultData", orderResultData)

        const { dispatch } = this.props.store
        const { history } = this.props.router
        const { result } = orderResultData

        this.orderResultData = {}

        switch (result)
        {
            case TransactionResult.APPROVED:
                // clear cart store
                dispatch(clearCart())
                // clear cart
                window.localStorage.removeItem('state');
                // redirect to home
                history.push("/")
                break;
            case TransactionResult.CANCELED:
                this.setState({orderComplete: false})
                break;
            case TransactionResult.ERROR:
                this.setState({orderComplete: false})
                break;
            default:
        }
    }
}