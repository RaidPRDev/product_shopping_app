import { visaCheckout } from "braintree-web"

import Button from "../../components/controls/Button";
import TransactionResult from "../TransactionResult";
import BraintreePaymentSDK from "../BraintreePaymentSDK";

export default class VisaCheckoutButton extends Button
{
    static isScriptsLoaded = false
    
    _visaCheckoutInstance = null
    _isProduction = false

    componentDidMount()
    {
        if (!VisaCheckoutButton.isScriptsLoaded)
        {
            this.buttonRef.current.setAttribute('disabled', 'true');
            this.loadScripts()
        }
        else this.initializeVisaCheckout()
    }

    loadScripts()
    {
        // add to head: document.head.appendChild(script);
        // add to body: document.body.appendChild(script);

        // Braintree SDK Visa Checkout Component
        const scriptVisaCheckout = document.createElement("script");
        scriptVisaCheckout.async = true;
        scriptVisaCheckout.src = "https://js.braintreegateway.com/web/3.55.0/js/visa-checkout.min.js";
        this.buttonRef.current.appendChild(scriptVisaCheckout);

        let checkoutSDKScript = ""
        let checkoutSDKButton = ""

        if (this._isProduction)
        {
            // Production assets:
            checkoutSDKScript = "https://assets.secure.checkout.visa.com/checkout-widget/resources/js/integration/v1/sdk.js"
            checkoutSDKButton = "https://secure.checkout.visa.com/wallet-services-web/xo/button.png"
        }
        else
        {
            // Sandbox assets:
            checkoutSDKScript = "https://sandbox-assets.secure.checkout.visa.com/checkout-widget/resources/js/integration/v1/sdk.js"
            checkoutSDKButton = "https://sandbox.secure.checkout.visa.com/wallet-services-web/xo/button.png"
        }

        // Visa Checkout SDK
        const scriptVisaCheckoutSDK = document.createElement("script");
        scriptVisaCheckoutSDK.async = true;
        scriptVisaCheckoutSDK.src = checkoutSDKScript;
        scriptVisaCheckoutSDK.onload = (e) => {
            this.initializeVisaCheckout()
        }
        this.buttonRef.current.appendChild(scriptVisaCheckoutSDK);

        // Visa Checkout button 
        const divVisaCheckoutButton = document.createElement("img");
        divVisaCheckoutButton.setAttribute("alt", "Visa Checkout");
        divVisaCheckoutButton.setAttribute("class", "v-button");
        divVisaCheckoutButton.setAttribute("role", "button");
        divVisaCheckoutButton.src = checkoutSDKButton;
        this.buttonRef.current.appendChild(divVisaCheckoutButton);
        
        VisaCheckoutButton.isScriptsLoaded = true

        // remove temp icon 
        const buttonInner = this.buttonRef.current.getElementsByClassName("button-inner")[0]
        buttonInner.setAttribute("style", "display: none;")
    }

    initializeVisaCheckout()
    {
        BraintreePaymentSDK.createClient({
            onCreate: this.createVisaCheckout.bind(this),
            onError: (clientError) => {
                console.log("BraintreePaymentSDK.clientError", clientError)
            }
        })
    }

    createVisaCheckout(clientInstance)
    {
        visaCheckout.create({
            client: clientInstance
        })
        .then((visaCheckoutInstance) =>
        {
            // Set up Visa Checkout
            this.visaCheckoutInitialized(visaCheckoutInstance)
        })
        .catch((err) =>
        {
            // Handle component creation error
            this.initializeVisaCheckoutComplete()
        });
    }

    visaCheckoutInitialized(visaCheckoutInstance)
    {
        this._visaCheckoutInstance = visaCheckoutInstance

        this.initializeVisaCheckoutComplete()
    }

    initializeVisaCheckoutComplete()
    {
        this.buttonRef.current.removeAttribute('disabled');
    }

    handleClick = (e) => 
    {
        this.buttonRef.current.setAttribute('disabled', 'true');

        const { cartTotal } = this.props

        const baseInitOptions = {
            paymentRequest: {
                currencyCode: "USD",
                subtotal: cartTotal
            }
        }

        if (this._visaCheckoutInstance === null) 
        {
            console.log("%cVisa Checkout Disabled", "color:yellow")
            return
        }

        // Populate init options with options Braintree requires.
        const initOptions = this._visaCheckoutInstance.createInitOptions(baseInitOptions);

        // Ready to start Visa Checkout.
        // Call `V.init` with the `initOptions`.
        if (window.V !== undefined)
        {
            window.V.init(initOptions);

            window.V.on('payment.success', (payment) =>
            {
                this._visaCheckoutInstance.tokenize(payment)
                .then((payload) =>
                {
                    // Send payload.nonce to your server, and create a transaction there.
                    this.sendPaymentInfo(payload.nonce)
                    // this.onVisaCheckoutApproved(payload)
                })
                .catch((tokenizeErr) =>
                {
                    console.log('Error during Visa Checkout tokenization', tokenizeErr);
                    this.onVisaCheckoutError(tokenizeErr)
                })
            })
        }
        else
        {
            this.onVisaCheckoutError({error:"V not defined"})
        }
    }

    sendPaymentInfo(payloadNonce)
    {
        const { cartTotal:totalPrice } = this.props

        BraintreePaymentSDK.sendPaymentInfo({
            payloadNonce, 
            totalPrice,
            onApproved: this.onVisaCheckoutApproved.bind(this),
            onError: this.onVisaCheckoutError.bind(this)
        })
    }

    onVisaCheckoutApproved(payload)
    {
        console.log("onVisaCheckoutApproved().payload", payload)

        const { onTransactionResult } = this.props

        onTransactionResult && onTransactionResult({
            result: TransactionResult.APPROVED,
            data: payload,
            orderTitle: "Thank you for your order!",
            orderMessage: null,
            orderButtonLabel: "Continue"
        })
    }

    onVisaCheckoutCanceled(data)
    {
        console.log("onVisaCheckoutCanceled().data", data)

        const { onTransactionResult } = this.props

        onTransactionResult && onTransactionResult({
            result: TransactionResult.CANCELED,
            data: data, 
            orderTitle: "Visa Checkout Canceled",
            orderMessage: data.message,
            orderButtonLabel: "Return to Checkout"
        })
    }

    onVisaCheckoutError(err)
    {
        console.log("onVisaCheckoutError().err", err)

        const { onTransactionResult } = this.props
        
        onTransactionResult && onTransactionResult({
            result: TransactionResult.ERROR,
            data: err,
            orderTitle: null,
            orderMessage: err.message,
            orderButtonLabel: "Return to Checkout"
        })
    }
} 