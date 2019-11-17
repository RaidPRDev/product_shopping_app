import React, { Component } from "react"
import util from '../../utils/util';
import { getProductItem } from "../../utils/productTools"
import { getProductLevelOptionItemByOptionID, getProductExtraOptionItemByOptionID } from "../../utils/productTools"

import Panel from "../controls/Panel";
import Radiobox from "../controls/Radiobox";
import Button from "../controls/Button";
import Alignment from "../layout/Alignment";

import { ReactComponent as CheckRightIcon } from '../../theme/icons/check_right_icon.svg';
import Label from "../controls/Label";

import { ReactComponent as BackIcon } from '../../theme/icons/back_icon.svg';

export default class RemoveProductView extends Component
{
    constructor(props)
    {
        super(props)

        this._hasInitialized = false
        this._classes = "remove-product-view-panel"
        
        this._selectedItemToRemove = ""
        this._hasSelectedItem = false

        this.state = {
            validate: false                 // display validator
        }
    }

    closeProductView(removedItem)
    {
        this._classes = "remove-product-view-panel"

        this.clearState()

        const { onClose } = this.props

        onClose && onClose(removedItem)
    }

    handleLevelOptionsChange = (event) =>
    {
        const { value } = event

        // set checked item level id
        this._hasSelectedItem = true
        this._selectedItemToRemove = value
        this._removeButtonClass = ""

        // update display
        this.setState({validate: true})
    }

    onProductItemRemoveButtonClick()
    {
        const { id } = this.props

        // send added item
        this.closeProductView({
            item: {
                id: id,
                optionSelected: this._selectedItemToRemove
            }
        })
    }

    clearState()
    {
        this._selectedItemToRemove = ""
        this._hasSelectedItem = false
        this._removeButtonClass = ""
        this.setState({validate: false})
    }    

    render() 
    {
        if (!this._hasInitialized) this._hasInitialized = true

        // show panel 
        let itemList = []
        if (this.props.isRemoveProductViewOpen) 
        {
            const { id, cart:{ items }, products } = this.props

            this._classes = "remove-product-view-panel product-view--open"
            
            // create cart list
            itemList = items.map((cartItem) => 
            {
                const product = getProductItem(cartItem, products)

                if (product.id === id)
                {
                    //const { name, price, images } = product
                    const { uid } = cartItem

                    // get level option selected
                    let levelOptionSelectedID = parseInt(cartItem.optionSelected)
                    let levelOptionLabel = getProductLevelOptionItemByOptionID(product, levelOptionSelectedID)
    
                    // parse extra options and get extra options selected
                    let selectedExtraOptions = []
                    for (let key in cartItem.extraOptionSelected)
                    {
                        let extraOptionID = parseInt(key.split("_")[1])
                        let selectedExtraOptionItem = getProductExtraOptionItemByOptionID(product, extraOptionID)
                        selectedExtraOptions.push(selectedExtraOptionItem.name)
                    }
    
                    // parse selected extra options 
                    let selectedExtraOptionsLabel = (selectedExtraOptions.length > 0) 
                        ? ", " + selectedExtraOptions.join(', ') 
                        : ""
    
                    return (
                        <Radiobox key={util.getUniqueString()}
                            name="item"
                            label={levelOptionLabel + selectedExtraOptionsLabel}
                            value={String(uid)}
                            selected={String(uid) === this._selectedItemToRemove}
                            handleRadioboxChange={this.handleLevelOptionsChange}
                       />
                    )
                }

                return (<div key={util.getUniqueString()}></div>)
            });

            if (!this._hasSelectedItem)
            {
                this._removeButtonClass = " disabled"
            }
        }

        return (
            <React.Fragment>
                <Panel classes={this._classes}>
                    <Panel classes="remove-product-view-header" padding="0px 20px" alignment={Alignment.CENTER_LEFT}>
                        <Button classes="back-button" label={"Back"} onClick={() => this.closeProductView()}>
                            <BackIcon width="18px" height="18px" fill="#1db3de"/>
                        </Button>
                    </Panel>
                    <Panel classes="remove-product-view-body">
                        <Label classes="remove-title" text="Delete item"></Label>
                        {itemList}
                    </Panel>
                    <Panel classes={"remove-to-cart-panel" + this._removeButtonClass} padding="0 10px 20px">
                        <Button classes="remove-to-cart-button" 
                            alignment={Alignment.HORIZ_VERT_SPACED} 
                            onClick={() => this.onProductItemRemoveButtonClick()}
                            label={"Remove from cart"}>
                                <CheckRightIcon style={{order:2}} width="25px" height="25px" fill="#fff"/>
                            </Button>
                    </Panel>
                </Panel>
            </React.Fragment>
        )
    }
}
