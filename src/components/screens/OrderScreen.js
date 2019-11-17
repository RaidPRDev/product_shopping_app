import React, { PureComponent } from "react"
import PropTypes from 'prop-types';

import Panel from "../controls/Panel";
import Label from "../controls/Label";
import Button from "../controls/Button";
import Alignment from "../layout/Alignment";
import TransactionResult from "../../payment/TransactionResult";

import { ReactComponent as SuccessIcon } from '../../theme/icons/success_icon.svg';
import { ReactComponent as CancelIcon } from '../../theme/icons/cancel_icon.svg';
import { ReactComponent as ErrorIcon } from '../../theme/icons/error_icon.svg';

export default class OrderScreen extends PureComponent
{
    static propTypes = {
        orderResultData: PropTypes.object,
        onClose: PropTypes.func
    }

    static defaultProps = {
        orderResultData: { orderResultData:{result:"error"} },
        onClose: null
    }

    isOrderSuccessful = false

    handleClose = () =>
    {
        const { orderResultData, onClose } = this.props

        onClose && onClose(orderResultData)
    }

    render() 
    {
        console.log("Order.props", this.props)

        const { orderResultData } = this.props
        const { orderTitle:title, orderMessage:message, orderButtonLabel:buttonLabel } = orderResultData

        let orderIcon = null
        let orderTitle = ""
        let orderMessage = null
        let orderButtonLabel = ""

        switch (orderResultData.result)
        {
            case TransactionResult.APPROVED:
                orderIcon = <SuccessIcon width="120px" height="120px" fill="#1db3de"/>
                orderTitle = title
                orderMessage = message
                orderButtonLabel = buttonLabel
                break;
            case TransactionResult.CANCELED:
                orderIcon = <CancelIcon width="120px" height="120px" fill="#f7c900"/>
                orderTitle = title
                orderMessage = message && <Label classes="order-message" text={message}></Label>
                orderButtonLabel = buttonLabel
                break;
            case TransactionResult.ERROR:
                orderIcon = <ErrorIcon width="120px" height="120px" fill="#e95b4b"/>
                orderTitle = title
                orderMessage = message && <Label classes="order-message" text={message}></Label>
                orderButtonLabel = buttonLabel
                break;
            default:
        }

        return (
        <React.Fragment>
            <Panel classes="ui-screen order-list">

                <Panel classes="order-list-panel" alignment={Alignment.CENTER}>
                    <Panel classes="order-icon">
                        {orderIcon}
                    </Panel>
                    {orderTitle && <Label classes="order-title" text={orderTitle}></Label>} 
                    {orderMessage}
                    <Button classes="order-close" 
                            label={orderButtonLabel} 
                            alignment={Alignment.CENTER}
                            onClick={this.handleClose}
                    />
                </Panel>

            </Panel>
        </React.Fragment>
        )
    }
}