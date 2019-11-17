import React, { PureComponent } from "react"
import PropTypes from 'prop-types';

import Panel from "../../controls/Panel";

import util from '../../../utils/util';
import Label from "../../controls/Label";
import Layout from "../../layout/Layout";
import Alignment from "../../layout/Alignment";
import Button from "../../controls/Button";
import Image from "../../controls/Image";

import { ReactComponent as PlusIcon } from '../../../theme/icons/plus_icon.svg';
import { ReactComponent as MinusIcon } from '../../../theme/icons/minus_icon.svg';
import { ReactComponent as InfoIcon } from '../../../theme/icons/info_icon.svg';

export default class ProductItem extends PureComponent
{
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string,
        thumb: PropTypes.any,
        cartTotal: PropTypes.number,

        onShowProductInfoView: PropTypes.func,
        onProductRemove: PropTypes.func,
        onShowAddProductView: PropTypes.func
    }

    handleShowProductInfoView() 
    {
        const { id, onShowProductInfoView } = this.props

        onShowProductInfoView && onShowProductInfoView(id)
    }

    handleProductRemove()
    {
        const { id, onProductRemove } = this.props

        onProductRemove && onProductRemove(id)
    }

    handleShowAddProductView()
    {
        const { id, onShowAddProductView } = this.props
        
        onShowAddProductView && onShowAddProductView(id)
    }

    render() 
    {
        const { name:productName , price: productPrice, thumb, cartTotal  } = this.props

        // check if we have any added items, if so show count and hide icon
        const productItemContainerClass = (cartTotal > 0) ? " active" : ""
        const addButtonClass = (cartTotal > 0) ? " show-label" : ""
        const removeButtonClass = (cartTotal === 0) ? " hide" : ""

        return (
            <Panel classes={"product-item" + productItemContainerClass} layout={Layout.VERTICAL}>
                <Panel classes="shop-container" layout={Layout.HORIZONTAL} alignment={Alignment.HORIZONTAL_SPACED}>
                    <Button classes={"product-remove" + removeButtonClass} onClick={this.handleProductRemove.bind(this)}>
                        <MinusIcon width="20px" height="20px" fill="#fff"/>
                    </Button>
                    <Button classes={"product-add" + addButtonClass} label={cartTotal.toString()} 
                    alignment={Alignment.CENTER} onClick={this.handleShowAddProductView.bind(this)}>
                        <PlusIcon className={"product-add-icon"} width="20px" height="20px" fill="#fff"/>  
                    </Button>
                </Panel>
                <Image classes="product-image" source={thumb}></Image>
                <Label classes="product-name" text={productName} alignment={Alignment.HORIZONTAL_CENTER}></Label>
                <Panel classes="price-container" layout={Layout.HORIZONTAL} alignment={Alignment.CENTER} >
                    <Label classes="product-price" text={"$" + util.formatPrice(parseFloat(productPrice))}></Label>
                    <Button classes="product-info" onClick={this.handleShowProductInfoView.bind(this)}>
                        <InfoIcon className={"product-info-icon"} width="10px" height="10px" fill="#a2a2a2"/>
                    </Button>
                </Panel>

            </Panel>
        )
    }
}