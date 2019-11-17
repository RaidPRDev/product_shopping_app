import React from "react"
import NumericStepper from "../../controls/NumericStepper";

export default class WaiterTip extends NumericStepper
{
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
                                    <div className="numeric-stepper-value-inner cart-waiter-icon icon-blue">
                                        <div className="numeric-stepper-value-label">{prefix + value}</div>
                                    </div>
                                </div>
                                <div className="numeric-stepper-inc" onClick={this.handleIncrementClick}>
                                    <div className="numeric-stepper-inc-inner cart-waiter-icon icon-gray">
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