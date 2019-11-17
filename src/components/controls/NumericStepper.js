import React, { Component } from "react"
import PropTypes from "prop-types"

export default class NumericStepper extends Component
{
    static propTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        step: PropTypes.number,
        maxValue: PropTypes.number,
        prefix: PropTypes.string,
        classes: PropTypes.string,
        onChange: PropTypes.func
    }
    static defaultProps = {
        step: 1,
        minValue: 0,
        maxValue: 99,
        prefix: "",
        classes: null,
        onChange: null
    }

    constructor(props)
    {
        super(props)

        this.state = {
            value: this.props.value
        }
    }

    handleDecrementClick = () =>
    {
        const { minValue, label, onChange } = this.props
        const { value } = this.state

        let newVal = value
        if (value > minValue) 
        {
            newVal -= 1
            this.setState({value: newVal})
            onChange && onChange({label: label, value: newVal})
        }
    }

    handleIncrementClick = () =>
    {
        const { maxValue, label, onChange } = this.props
        const { value } = this.state

        let newVal = value
        if (value < maxValue) 
        {
            newVal += 1
            this.setState({value: newVal})
            onChange && onChange({label: label, value: newVal})
        }
    }

    render()
    {
        const { classes, prefix, label } = this.props
        const { value } = this.state
        const classList = (classes !== null) ? " " + classes : ""

        return (
            <React.Fragment>
                <div className={"numeric-stepper" + classList}>
                    <div className="numeric-stepper-inner">
                        <div className="numeric-stepper-label">
                            <div className="numeric-stepper-label-inner">{label}</div>
                        </div>
                        <div className="numeric-stepper-controls">
                            <div className="numeric-stepper-controls-inner">
                                <div className="numeric-stepper-dec" onClick={this.handleDecrementClick}>
                                    <div className="numeric-stepper-dec-inner cart-waiter-icon icon-gray">
                                        <div className="numeric-stepper-dec-label">-</div>
                                    </div>
                                </div>
                                <div className="numeric-stepper-value">
                                    <div className="numeric-stepper-value-inner">
                                        <div className="numeric-stepper-value-label">{prefix + value}</div>
                                    </div>
                                </div>
                                <div className="numeric-stepper-inc" onClick={this.handleIncrementClick}>
                                    <div className="numeric-stepper-inc-inner">
                                        <div className="numeric-stepper-inc-label">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}