import React, { Component } from "react"
import PropTypes from 'prop-types';

import util from '../../utils/util';

import Panel from "../controls/Panel";
import Label from "../controls/Label";
import Checkbox from "../controls/Checkbox";
import Radiobox from "../controls/Radiobox";
import Button from "../controls/Button";
import Alignment from "../layout/Alignment";

import { ReactComponent as CheckRightIcon } from '../../theme/icons/check_right_icon.svg';
import { ReactComponent as BackIcon } from '../../theme/icons/back_icon.svg';

export default class AddProductView extends Component
{
    static propTypes = {
        id: PropTypes.number,
        options: PropTypes.object,
        extra: PropTypes.object,
        price: PropTypes.string
    }

    static defaultProps = {
        id: null
    }

    constructor(props)
    {
        super(props)

        this._hasInitialized = false
        this._classes = "add-product-view-panel"
        
        this.levelOptionSelected = "1"      // level option selected id
        this.extraOptionCheckedItems = {}   // extra option flags
        this.extraOptionSelected = {}       // extra option selected info 
        
        this.totalPrice = 0.0               // total cost tracker

        this.state = {
            validate: false                 // display validator
        }
    }

    handleLevelOptionsChange = (event) =>
    {
        const { value } = event

        // set checked item level id
        this.levelOptionSelected = value

        // update display
        this.setState({validate: true})
    }

    handleExtraOptionsChange = (event) =>
    {
        const { name, isChecked } = event

        // set checked item flags
        this.extraOptionCheckedItems[name] = isChecked

        // update extra option selected index
        if (isChecked) 
        {
            this.extraOptionSelected = {
                ...this.extraOptionSelected,
                [name]:isChecked
            }
            this.setState({validate: true})
        }
        else 
        {
            delete this.extraOptionSelected[name]
            this.setState({validate: true})
        }
    }

    handleAddButtonClick = () =>
    {
        const { id, onClose } = this.props

        onClose && onClose({
            item: {
                uid: util.getUniqueString(),
                id: id,
                price: this.totalPrice,
                optionSelected: this.levelOptionSelected,
                extraOptionSelected: {...this.extraOptionSelected},
            },
            totalItemPrice: this.totalPrice
        })

        this.clearState()
    }

    handleBackClick = () =>
    {
        const { onClose } = this.props

        onClose && onClose()

        this.clearState()
    }

    clearState()
    {
        this._classes = "add-product-view-panel"

        this.levelOptionSelected = "1"
        this.extraOptionSelected = {}
        this.setState({validate: false})
    }    

    render() 
    {
        if (!this._hasInitialized) this._hasInitialized = true
        
        const { isAddProductViewOpen, options, extra, price } = this.props

        // show panel 
        if (isAddProductViewOpen) 
        {
            this._classes = "add-product-view-panel product-view--open"

            // check if checked items has values
            // if so, intialize flags
            if (util.isObjectEmpty(this.extraOptionCheckedItems))
            {
                if (!util.isObjectEmpty(extra))
                {
                    // reset checked item flags when opening
                    extra.items.map((item) => 
                    {
                        this.extraOptionCheckedItems["check_"+item.id] = false;
                        return item
                    });
                }
            }
        }

        // setup option boxes
        let optionsList = null, extraOptionsList = null
        let optionsLabelsList = null, extraOptionLabelsList = null
        let extraTotalPrice = 0
        this.totalPrice = parseFloat(price)
        if (!util.isObjectEmpty(options))
        {
            // setup level options
            optionsLabelsList = []
            optionsLabelsList.push(<Label key={util.getUniqueString()} classes="option-title-text" text={options.name} />)
            optionsLabelsList.push(<Label key={util.getUniqueString()} classes="option-sub-text" text={options.sub} />)

            optionsList = options.items.map((item) => 
            {
                return (
                    <Radiobox key={item.id}
                        name="level"
                        label={item.name}
                        value={String(item.id)}
                        selected={String(item.id) === this.levelOptionSelected}
                        handleRadioboxChange={this.handleLevelOptionsChange}
                   />
                )
            });

            // setup extra options
            extraOptionLabelsList = []
            extraOptionLabelsList.push(<Label key={util.getUniqueString()} classes="extra-title-text" text={extra.name} />)
            extraOptionLabelsList.push(<Label key={util.getUniqueString()} classes="extra-sub-text" text={extra.sub} />)

            extraOptionsList = extra.items.map((item) => 
            {
                return (
                    <Checkbox key={item.id}
                        name={"check_" + item.id}
                        label={item.name + " + $" + util.formatPrice(parseFloat(item.price))}
                        selected={this.extraOptionCheckedItems["check_" + item.id]}
                        handleCheckboxChange={this.handleExtraOptionsChange}
                   />
                )
            });

            // calculate extra option selected total
            for (let key in this.extraOptionSelected) 
            {
                let price = extra.items.find((entry) => {
                    return entry.id === parseInt(key.split("_")[1])
                }).price

                extraTotalPrice += parseFloat(price)
            }
            
            // update total price
            this.totalPrice += extraTotalPrice
        }

        // check if we are closing view, if so reset checked flags
        if (!isAddProductViewOpen && !util.isObjectEmpty(this.extraOptionCheckedItems))
        {
            this.extraOptionCheckedItems = {}
        }

        return (
            <React.Fragment>
                <Panel classes={this._classes}>
                    <Panel classes="add-product-view-header" padding="0px 20px" alignment={Alignment.CENTER_LEFT}>
                        <Button classes="back-button" label={"Back"} onClick={this.handleBackClick}>
                            <BackIcon width="18px" height="18px" fill="#1db3de"/>
                        </Button>
                    </Panel>
                    
                    <Panel classes="add-product-view-body">
                        {optionsLabelsList}
                        {optionsList}
                        {extraOptionLabelsList}
                        {extraOptionsList}
                    </Panel>
                    
                    <Panel classes="add-to-cart-panel">
                        <Button classes="add-to-cart-button" 
                            onClick={this.handleAddButtonClick}
                            label={"Add to cart: $"+util.formatPrice(this.totalPrice)} 
                        >
                            <CheckRightIcon width="25px" height="25px" fill="#fff" style={{order:2}} />
                        </Button>
                    </Panel>
                </Panel>
            </React.Fragment>
        )
    }
}
