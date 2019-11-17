import React, { Component } from "react"
import PropTypes from 'prop-types';

import util from '../../utils/util';
import Panel from "../controls/Panel";
import Image from "../controls/Image";
import Label from "../controls/Label";
import Alignment from "../layout/Alignment";
import Button from "../controls/Button";

import { ReactComponent as BackIcon } from '../../theme/icons/back_icon.svg';

export default class ProductView extends Component
{
    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.string,
        description: PropTypes.string,
        thumb: PropTypes.string,
        onClose: PropTypes.func
    }

    static defaultProps = {
        name: "Name",
        price: "0.00",
        description: "Description",
        thumb: "images/products/large_placeholder.png",
        onClose: null
    }

    constructor(props)
    {
        super(props)

        this._hasInitialized = false
        this._panelClassName = "product-view"
        this._classes = this._panelClassName

        this.state = {
            validate: false
        }
    }

    handleBackClick = () =>
    {
        const { onClose } = this.props

        onClose && onClose()

        this.clearState()
    }

    clearState()
    {
        this._classes = this._panelClassName
        this.setState({validate: false})
    }   
   
    render() 
    {
        if (!this._hasInitialized) this._hasInitialized = true

        const { name, price, description, thumb:largeImage, isProductViewOpen } = this.props

        if (isProductViewOpen) 
        {
            this._classes = this._panelClassName + " product-view--open"
        }

        return (
            <React.Fragment>
                <Panel classes={this._classes}>
                    <Panel classes="product-view-header" padding="0px 20px" alignment={Alignment.CENTER_LEFT}>
                        <Button classes="back-button" label={"Back"} onClick={this.handleBackClick}>
                            <BackIcon width="18px" height="18px" fill="#1db3de"/>
                        </Button>
                    </Panel>
                    
                    <Panel classes="product-view-body" alignment={Alignment.HORIZONTAL_CENTER}>
                        <Image classes="product-image" source={largeImage}></Image>
                        <Label classes="product-name" text={name}></Label>
                        <Label classes="product-price" text={"$" + util.formatPrice(parseFloat(price))}></Label>
                    </Panel>

                    <Panel classes="product-description-panel" title="Description">
                        <Label classes="product-description" text={description}></Label>
                    </Panel>

                </Panel>
            </React.Fragment>
        )
    }
}