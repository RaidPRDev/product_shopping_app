import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import Label from "./Label"

import Layout from "../layout/Layout"

class Panel extends PureComponent
{
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        titleClasses: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        padding: PropTypes.string,
        classes: PropTypes.string,
        layout: PropTypes.string,
        alignment: PropTypes.string,
        onClick: PropTypes.func
    }
    static defaultProps = {
        id: null,
        title: null,
        titleClasses: null,
        width: null,
        height: null,
        padding: null,
        classes: null,
        layout: Layout.VERTICAL,
        alignment: null,
        onClick: null
    }

    panelStyles = {}
    panelInnerStyles = {}

    setStyles()
    {
        const { width, height, padding } = this.props

        this.panelSizeStyles = {
            width: width,
            height: height
        }

        this.panelInnerStyles = {
            padding: padding
        }
    }

    handleClick = (e) =>
    {
        const { onClick } = this.props

        onClick && onClick(e)
    }

    render()
    {
        const { id, layout, alignment, classes, title, titleClasses, children } = this.props
        const classList = (classes !== null) ? " " + classes : ""
        const classTitleList = (titleClasses !== null) ? " " + titleClasses : ""
        const layoutList = (layout !== null) ? " " + layout : ""
        const alignmentList = (alignment !== null) ? " " + alignment : ""
        
        // check for title label
        const labelElement = (title !== null) 
            ? <Label classes={"panel-title" + classTitleList} text={title}/>
            : null

        this.setStyles()

        return (
            <React.Fragment>
                <div id={id} className={"panel" + classList + layoutList} style={this.panelStyles} onClick={this.handleClick}>
                    {labelElement}
                    <div className={"panel-inner" + layoutList + alignmentList} style={this.panelInnerStyles}>
                        {children}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Panel