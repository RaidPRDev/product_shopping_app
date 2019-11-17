import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import Image from "./Image"

class Label extends PureComponent
{
    static propTypes = {
        text: PropTypes.string.isRequired,
        icon: PropTypes.string,
        alignment: PropTypes.string,
        classes: PropTypes.string
    }
    static defaultProps = {
        icon: null,
        alignment: null,
        classes: null
    }

    render()
    {
        const { classes, alignment, icon, text } = this.props
        const classList = (classes !== null) ? " " + classes : ""
        const alignmentList = (alignment !== null) ? " " + alignment : ""

        // check for icon
        const iconElement = (icon !== null) 
            ? <Image classes="label-icon" source={icon}/>
            : null

        return (
            <React.Fragment>
                <div className={"label" + classList}>
                    <div className={"label-inner" + alignmentList}>
                        {iconElement}
                        <div className="label-text">{text}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Label