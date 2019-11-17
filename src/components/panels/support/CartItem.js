import React, { PureComponent } from "react"

class CartItem extends PureComponent
{
    render()
    {
        const { thumb, productName, optionLabel, totalItemPrice } = this.props

        return (
            <div className="cart-item">
                <div className="cart-item-inner">
                    <div className="cart-thumb">
                        <div className="cart-thumb-inner">
                        <img className="product-image-source" alt="" width="80" height="80"
                            src={thumb}>
                        </img>
                        </div>
                    </div>
                    <div className="cart-description">
                        <div className="cart-description-inner">
                            <div className="product-name">{productName}</div>
                            <div className="product-options">{optionLabel}</div>
                        </div>
                    </div>
                    <div className="cart-info">
                        <div className="cart-info-inner">
                            <div className="product-count">
                                <div className="product-count-inner">
                                    <div className="cart-count-label">1</div>
                                </div>
                            </div>
                            <div className="product-price">
                                <div className="product-price-inner">
                                    <div className="product-price-label">${totalItemPrice}</div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartItem