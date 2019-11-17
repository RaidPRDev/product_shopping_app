import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import util from '../../../utils/util';
import Panel from "../../controls/Panel";
import Button from "../../controls/Button";
import Label from "../../controls/Label";
import Layout from "../../layout/Layout";
import Alignment from "../../layout/Alignment";

import { ReactComponent as CheckRightIcon } from '../../../theme/icons/check_right_icon.svg';

class CartCheckoutFloater extends PureComponent
{
    static propTypes = {
        price: PropTypes.number,
        onClick: PropTypes.func
    }
    static defaultProps = {
        price: null,
        onClick: null
    }

    constructor(props)
    {
        super(props)

        this.state = {
            totalPrice: this.props.price
        }
    }

    handleClick = (e) => 
    {
        const { onClick } = this.props

        console.log("CartCheckoutFloater.handleClick")

        onClick && onClick(e)
    }

    render() 
    {
        const { totalPrice } = this.state

        const priceLabel = "$" + util.formatPrice(totalPrice)

        return (
            <Panel classes="cart-checkout-floater">
                <Panel classes="cart-checkout-floater-labels" layout={Layout.HORIZONTAL} alignment={Alignment.HORIZ_VERT_SPACED}>
                    <Label classes="cart-checkout-floater-title" text="Total"></Label>
                    <Label classes="cart-checkout-floater-price" text={priceLabel}></Label>
                </Panel>
                <Button classes="cart-checkout-floater-button" alignment={Alignment.HORIZ_VERT_SPACED} onClick={this.handleClick} >
                    <Label classes="cart-checkout-floater-button-label" text="Proceed to checkout"></Label>
                    <CheckRightIcon width="25px" height="25px" fill="#fff"/>
                </Button>
                
            </Panel>
        )
    }
}

export default CartCheckoutFloater