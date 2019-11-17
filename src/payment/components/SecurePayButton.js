import { hostedFields } from "braintree-web"
import PropTypes from "prop-types"

import Button from "../../components/controls/Button";
import TransactionResult from "../TransactionResult";
import BraintreePaymentSDK from "../BraintreePaymentSDK";

export default class SecurePayButton extends Button
{
    static propTypes = {
        ...super.propTypes,
        onValidityChange: PropTypes.func
    }

    static defaultProps = {
        ...super.defaultProps,
        onValidityChange: null
    }

    _clientToken = ""
    _clientInstance = null
    _hostedFieldsInstance = null

    componentDidMount()
    {
        this.initializePayCheckout()
    }

    initializePayCheckout()
    {
        this.buttonRef.current.removeAttribute('disabled');

        BraintreePaymentSDK.createClient({
            onCreate: this.createHostedFields.bind(this),
            onError: (clientError) => {
                console.log("BraintreePaymentSDK.clientError", clientError)
            }
        })
    }

    createHostedFields(clientInstance)
    {
        this.initializeSecurePayComplete()
        
        // Create Hosted Fields instance
        hostedFields.create({
            client: clientInstance,
            styles: {
                "input":{
                    "font-size": "16px",
                    "color": "#1db3de"
                },
                "input.invalid":{
                    "color":"#e95b4b"
                },
                "input.valid":{
                    "color":"#1db3de"
                }
            },
            fields: {
                number: {
                    selector: "#cardnumber",
                    placeholder: "Card Number"
                },
                cvv: {
                    selector: "#cvc",
                    placeholder: 'CVC'
                },
                expirationDate: {
                    selector: "#exp-date",
                    placeholder: 'MM / YY'
                }
            }
        },
        // Use the Hosted Fields instance here to tokenize a card
        (hostedFieldsErr, hostedFieldsInstance) => 
        {
            if (hostedFieldsErr) 
            {
                console.log("SecurePay.hostedFieldsErr", hostedFieldsErr)
                return
            }

            this._hostedFieldsInstance = hostedFieldsInstance

            hostedFieldsInstance.on('validityChange', this.handleValidityChange)
        })
    }

    setFocus(name)
    {
        this._hostedFieldsInstance.focus(name);
    }

    setBlur(name)
    {
        this._hostedFieldsInstance.blur(name);
    }

    // This event is emitted when the validity of a field has changed. 
    // Validity is represented in the stateObject as two booleans: isValid and isPotentiallyValid.
    handleValidityChange = (e) =>
    {
        const { onValidityChange } = this.props

        onValidityChange && onValidityChange(e)
    }

    initializeSecurePayComplete()
    {
        this.buttonRef.current.removeAttribute('disabled');
    }

    handleClick = (e) => 
    {
        this.buttonRef.current.setAttribute('disabled', 'true');

        this._hostedFieldsInstance.tokenize((tokenizeErr, payload) =>
        {
            if (tokenizeErr) 
            {
                this.onSecurePayError(tokenizeErr)
                return;
            }

            this.sendPaymentInfo(payload.nonce)
        })
    }

    sendPaymentInfo(payloadNonce)
    {
        const { cartTotal:totalPrice } = this.props

        BraintreePaymentSDK.sendPaymentInfo({
            payloadNonce, 
            totalPrice,
            onApproved: this.onSecurePayApproved.bind(this),
            onError: this.onSecurePayError.bind(this)
        })
    }

    onSecurePayApproved(payload)
    {
        console.log("onSecurePayApproved().payload", payload)

        const { onTransactionResult } = this.props

        onTransactionResult && onTransactionResult({
            result: TransactionResult.APPROVED,
            data: payload,
            orderTitle: "Thank you for your order!",
            orderMessage: null,
            orderButtonLabel: "Continue"
        })
    }

    onSecurePayError(err)
    {
        console.log("onSecurePayError().err", err)

        /*
        -> authorization-responses
        ref: https://developers.braintreepayments.com/reference/general/processor-responses/authorization-responses#types-of-declines
        */
        
        const { onTransactionResult } = this.props
        
        onTransactionResult && onTransactionResult({
            result: TransactionResult.ERROR,
            data: err,
            orderTitle: null,
            orderMessage: "There was a problem with your order, please try again.",
            orderButtonLabel: "Return to Checkout"
        })
    }

    componentWillUnmount()
    {
        console.log("%conSecurePayError().componentWillUnmount", "color:yellow")

        this._hostedFieldsInstance.off('validityChange', this.handleValidityChange)
    }
} 
