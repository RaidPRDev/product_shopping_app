import React, { Component } from "react"
import Button from "../controls/Button"

import { ReactComponent as BackIcon } from '../../theme/icons/back_icon.svg';

export default class CheckoutSubHeader extends Component
{
    handleBackClick = () =>
    {
        const { history } = this.props

        history.push("./cart")
    }

    render() 
    {
        return (
            <nav className="checkout-sub-header">
                <div className="checkout-sub-header-inner">
                    <Button classes="checkout-sub-header-back" label="Edit Cart" onClick={this.handleBackClick}>
                        <BackIcon width="18px" height="18px" fill="#fff"/>
                    </Button>  
                </div>
            </nav>
        )
    }
}