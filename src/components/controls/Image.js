import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import Alignment from "../layout/Alignment"

class Image extends PureComponent
{
    static propTypes = {
        source: PropTypes.string.isRequired,
        width: PropTypes.string,
        height: PropTypes.string,
        alt: PropTypes.string,
        classes: PropTypes.string,
        alignment: PropTypes.string
    }
    static defaultProps = {
        width: "100%",
        height: "100%",
        alt: null,
        classes: null,
        alignment: Alignment.CENTER
    }

    render()
    {
        const { classes, alignment, source, width, height, alt } = this.props
        const classList = (classes !== null) ? " " + classes : ""
        const classAlignmentList = (alignment !== null) ? " " + alignment : ""
        
        return (
            <React.Fragment>
                <div className={"image" + classList}>
                    <div className={"image-inner" + classAlignmentList}>
                        <img src={source} width={width} height={height} alt={alt}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Image