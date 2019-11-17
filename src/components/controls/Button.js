import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import Image from "./Image"
import Label from "./Label"

import Alignment from "../layout/Alignment"
import Layout from "../layout/Layout"
import LayoutOrder from "../layout/LayoutOrder"

class Button extends PureComponent
{
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        labelOrder: PropTypes.string,
        labelClasses: PropTypes.string,
        labelLayout: PropTypes.string,
        labelAlignment: PropTypes.string,
        icon: PropTypes.string,
        iconOrder: PropTypes.string,
        iconClasses: PropTypes.string,
        iconLayout: PropTypes.string,
        iconAlignment: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        classes: PropTypes.string,
        layout: PropTypes.string,
        alignment: PropTypes.string,
        onClick: PropTypes.func
    }
    static defaultProps = {
        id: null,
        label: null,
        labelOrder: LayoutOrder.ORDER_1,
        labelClasses: null,
        labelLayout: null,
        labelAlignment: null, 
        icon: null,
        iconOrder: LayoutOrder.ORDER_2,
        iconClasses: null,
        iconLayout: null,
        iconAlignment: null,
        width: null,
        height: null,
        classes: null,
        layout: Layout.HORIZONTAL,
        alignment: Alignment.CENTER,
        onClick: null
    }

    constructor(props)
    {
        super(props)

        this.buttonRef = React.createRef()
        this.buttonStyles = {}
    }

    handleClick = (e) => 
    {
        const { onClick } = this.props

        onClick && onClick(e)
    }

    setStyles()
    {
        const { width, height } = this.props

        this.buttonStyles = {
            width: width,
            height: height
        }
    }

    render()
    {
        const { id, layout, alignment, classes, 
            label, labelOrder, labelClasses, labelLayout, labelAlignment, 
            icon, iconOrder, iconClasses, iconLayout, iconAlignment, 
            children } = this.props

        const classList = (classes !== null) ? " " + classes : ""
        const layoutList = (layout !== null) ? " " + layout : ""
        const alignmentList = (alignment !== null) ? " " + alignment : ""
        
        const classLabelList = (labelClasses !== null) ? " " + labelClasses : ""
        const classLabelOrderList = (labelOrder !== null) ? " " + labelOrder : ""
        const classLabelLayoutList = (labelLayout !== null) ? " " + labelLayout : ""
        const classLabelAlignmentList = (labelAlignment !== null) ? " " + labelAlignment : ""
        const classIconList = (iconClasses !== null) ? " " + iconClasses : ""
        const classIconOrderList = (iconOrder !== null) ? " " + iconOrder : ""
        const classIconLayoutList = (iconLayout !== null) ? " " + iconLayout : ""
        
        // check for label
        const labelElement = (label !== null) 
            ? <Label classes={"button-label" + classLabelList + classLabelLayoutList + classLabelAlignmentList + classLabelOrderList} text={label}/>
            : null

        // check for icon
        const iconElement = (icon !== null) 
            ? <Image classes={"button-icon" + classIconList + classIconLayoutList + classIconOrderList} alignment={iconAlignment} source={icon}/>
            : null

        this.setStyles()

        if (this.buttonRef.current === null) this.buttonRef = React.createRef()

        return (
            <React.Fragment>
                <div id={id} ref={this.buttonRef} className={"button" + classList} style={this.buttonStyles} onClick={this.handleClick}>
                    <div className={"button-inner" + layoutList + alignmentList}>
                        {iconElement}
                        {labelElement}
                        {children}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Button