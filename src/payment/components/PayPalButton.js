import Button from "../../components/controls/Button";
import { paypalCheckout  } from "braintree-web"
import TransactionResult from "../TransactionResult";
import BraintreePaymentSDK from "../BraintreePaymentSDK";

export default class PayPalButton extends Button
{
    static isScriptsLoaded = false

    componentDidMount()
    {
        this.buttonRef.current.setAttribute('disabled', 'true');

        if (!PayPalButton.isScriptsLoaded)
        {
            this.loadScripts()
        }
        else 
        {
            this.initializePayPalCheckout()
        }
    }

    loadScripts()
    {
        // add to head: document.head.appendChild(script);
        // add to body: document.body.appendChild(script);

        const scriptPayPal = document.createElement("script");
        scriptPayPal.async = true;
        scriptPayPal.setAttribute("data-version-4", "");
        scriptPayPal.src = "https://www.paypalobjects.com/api/checkout.js";
        scriptPayPal.onload = (e) => 
        {
            this.initializePayPalCheckout()
        }
        this.buttonRef.current.appendChild(scriptPayPal);

        PayPalButton.isScriptsLoaded = true
    }

    initializePayPalCheckout()
    {
        BraintreePaymentSDK.createClient({
            onCreate: this.createPayPalCheckout.bind(this),
            onError: (clientError) => 
            {
                console.log("BraintreePaymentSDK.clientError", clientError)
            }
        })
    }

    createPayPalCheckout(clientInstance)
    {
        const { cartTotal } = this.props

        paypalCheckout.create({
            client: clientInstance
        })
        .then((paypalCheckoutInstance) => 
        {
            // Set up PayPal with the checkout.js library
            return window.paypal.Button.render({
                env: "sandbox", // or production
                style: {
                    shape: 'rect',
                    label: 'pay',
                    size: 'responsive',
                    tagline: 'false'
                },

                payment: (e) =>
                {
                    return paypalCheckoutInstance.createPayment({
                        // Your PayPal options here. For available options, see
                        // http://braintree.github.io/braintree-web/current/PayPalCheckout.html#createPayment
                        flow: 'checkout',
                        displayName: 'FOOD APP',
                        amount: cartTotal,
                        currency: 'USD'
                    })
                },

                onAuthorize: (data, actions) =>
                {
                    //console.log("onAuthorize().data", data)
                    //console.log("onAuthorize().actions", actions)
                    return paypalCheckoutInstance.tokenizePayment(data)
                    .then((payload) =>
                    {
                        // Submit `payload.nonce` to your server.
                        this.sendPaymentInfo(payload.nonce)
                    })
                },

                onCancel: (data) =>
                {
                    this.onPayPalCanceled(data)
                },
              
                onError: (err) =>
                {
                    this.onPayPalError(err)
                }
            }, '#paypal-button')
        })
        .catch((err) =>
        {
            // Handle component creation error
            console.log("catch", err)
        });

        this.buttonRef.current.removeAttribute('disabled');
    }

    sendPaymentInfo(payloadNonce)
    {
        const { cartTotal:totalPrice } = this.props

        BraintreePaymentSDK.sendPaymentInfo({
            payloadNonce, 
            totalPrice,
            onApproved: this.onPayPalApproved.bind(this),
            onError: this.onPayPalError.bind(this)
        })
    }

    onPayPalApproved(payload)
    {
        console.log("onPayPalApproved().payload", payload)

        const { onTransactionResult } = this.props

        onTransactionResult && onTransactionResult({
            result: TransactionResult.APPROVED,
            data: payload,
            orderTitle: "Thank you for your order!",
            orderMessage: null,
            orderButtonLabel: "Continue"
        })
    }

    onPayPalCanceled(data)
    {
        console.log("onPayPalCanceled().data", data)

        const { onTransactionResult } = this.props

        onTransactionResult && onTransactionResult({
            result: TransactionResult.CANCELED,
            data: data,
            orderTitle: null,
            orderMessage: "The order was canceled, please try again.",
            orderButtonLabel: "Return to Checkout"
        })
    }

    onPayPalError(err)
    {
        console.log("onPayPalError().err", err)

        const { onTransactionResult } = this.props
        
        onTransactionResult && onTransactionResult({
            result: TransactionResult.ERROR,
            data: err,
            orderTitle: null,
            orderMessage: "There was a problem with your order, please try again.",
            orderButtonLabel: "Return to Checkout"
        })
    }
} 
