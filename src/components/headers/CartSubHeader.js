import React, { Component } from "react"
import Button from "../controls/Button"

import { ReactComponent as BackIcon } from '../../theme/icons/back_icon.svg';

export default class CartSubHeader extends Component
{
    handleBackClick = () =>
    {
        const { history } = this.props

        history.push("./")
    }

    render() 
    {
        return (
            <nav className="cart-sub-header">
                <div className="cart-sub-header-inner">
                    <Button classes="cart-sub-header-back" label="Edit Cart" onClick={this.handleBackClick}>
                        <BackIcon width="18px" height="18px" fill="#fff"/>
                    </Button>  
                </div>
            </nav>
        )
    }
}