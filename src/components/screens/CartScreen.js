import React, { Component } from "react"
import util from '../../utils/util';
import { getProductItem } from "../../utils/productTools"
import { getProductLevelOptionItemByOptionID, getProductExtraOptionItemByOptionID } from "../../utils/productTools"

import { updateCart } from "../../data/store/Cart/actions"

import CartItem from "../panels/support/CartItem";
import CartCheckoutFloater from "../panels/support/CartCheckoutFloater";
import CartSubHeader from "../headers/CartSubHeader";
import WaiterTip from "../panels/support/WaiterTip";

export default class CartScreen extends Component
{
    constructor(props)
    {
        super(props);

        const { cart:{ waiter } } = props.store

        this.waiterTip = waiter

        this.checkOutFloater = React.createRef();

        this.state = {}
    }

    componentDidMount()
    {
        this.targetElement = document.querySelector('body');
        this.targetElement.className = "app-container cart"
    }

    onNumericStepChange = (e) =>
    {
        const { value } = e
        const { cart } = this.props.store

        this.waiterTip = value
        this.checkOutFloater.current.setState({totalPrice:this.waiterTip + cart.total})
    }

    handleGoCheckout = (e) => 
    {
        const { dispatch } = this.props.store

        dispatch(updateCart({
            waiter: parseFloat(this.waiterTip)
        }))

        const { history } = this.props.router

        history.push("./checkout")
    }

    render() {
        const { cart:{ items, count, waiter, total }, products } = this.props.store
        const { history } = this.props.router

        if (products === undefined) 
        {
            return (<div>Loading....</div>)
        }

        // create cart list
        const itemList = items.map((cartItem) => 
        {
            const product = getProductItem(cartItem, products)
            
            const { name, price, images } = product

            // get level option selected
            let levelOptionSelectedID = parseInt(cartItem.optionSelected)
            let levelOptionLabel = getProductLevelOptionItemByOptionID(product, levelOptionSelectedID)

            // parse extra options and get extra options selected
            let selectedExtraOptions = []
            let totalItemPrice = parseFloat(price)
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

            // setup data for cart item
            const cartItemData = {
                thumb: images[0].small,
                productName: name,
                optionLabel: levelOptionLabel + selectedExtraOptionsLabel,
                totalItemPrice: totalItemPrice
            }

            return (
                <CartItem key={util.getUniqueString()} {...cartItemData} />
            )
        });

        // check if we have any items, show label accordingly
        if (itemList.length === 0)
        {
            itemList.push(<div key={util.getUniqueString()} className="cart-no-items"><div className="cart-no-items-inner">No items in cart</div></div>)
        }

        return (
            <div className="ui-screen cart-list">
                <CartSubHeader history={history} />     

                <div className="cart-items-panel">
                    <div className="cart-items-panel-inner">
                        <div className="cart-items-panel-title">Items ({count})</div>
                        {itemList}
                    </div>
                    
                    <div className="cart-sub-total">
                        <div className="cart-sub-total-inner">
                            <div className="sub-total-label">subtotal</div>
                            <div className="sub-total-price">${util.formatPrice(total)}</div>
                        </div>
                    </div>

                    <WaiterTip classes="cart-waiter-tip" 
                        label="WAITER TIP" 
                        value={waiter} 
                        prefix="$"
                        onChange={this.onNumericStepChange}
                    />

                    <CartCheckoutFloater ref={this.checkOutFloater} price={this.waiterTip + total} onClick={this.handleGoCheckout} />
                </div>
            </div>
        )
    }
}