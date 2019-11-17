import React, { PureComponent } from "react"
import util from '../../../utils/util';
import Panel from "../../controls/Panel";
import Button from "../../controls/Button";
import Label from "../../controls/Label";
import Layout from "../../layout/Layout";
import Alignment from "../../layout/Alignment";

import { ReactComponent as CheckRightIcon } from '../../../theme/icons/check_right_icon.svg';

class CheckoutFloater extends PureComponent
{
    handleClick = (e) => 
    {
        const { onClick } = this.props

        onClick && onClick(e)
    }

    render() 
    {
        const { cartTotal, cartTotalPrice } = this.props

        const showClass = (cartTotal > 0) ? " show" : ""

        return (
            <Panel classes={"checkout-floater" + showClass} layout={Layout.HORIZONTAL} alignment={Alignment.HORIZ_VERT_SPACED} onClick={this.handleClick}>
                <Label classes="checkout-floater-title" text={"Cart: " + cartTotal + " | Total: $" + util.formatPrice(cartTotalPrice)}></Label>
                <Button classes="checkout-floater-button" layout={Layout.HORIZONTAL} alignment={Alignment.NONE} >
                    <Label classes="checkout-floater-button-label" text="Checkout"></Label>
                    <div className="icon-container">
                        <CheckRightIcon width="20px" height="20px" fill="#fff"/>
                    </div>
                </Button>
            </Panel>
        )
    }
}

export default CheckoutFloater