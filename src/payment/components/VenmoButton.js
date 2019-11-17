import { venmo } from "braintree-web"

import Button from "../../components/controls/Button";
import TransactionResult from "../TransactionResult";
import BraintreePaymentSDK from "../BraintreePaymentSDK";

export default class VenmoButton extends Button
{
    static isScriptsLoaded = false
    
    _venmoInstance = null

    componentDidMount()
    {
        if (!VenmoButton.isScriptsLoaded)
        {
            this.buttonRef.current.setAttribute('disabled', 'true');
            this.loadScripts()
        }
        else this.initializeVenmoCheckout()
    }

    loadScripts()
    {
        // add to head: document.head.appendChild(script);
        // add to body: document.body.appendChild(script);

        const scriptVenmo = document.createElement("script");
        scriptVenmo.async = true;
        scriptVenmo.src = "https://js.braintreegateway.com/web/3.55.0/js/venmo.min.js";
        this.buttonRef.current.appendChild(scriptVenmo);

        const scriptCollector = document.createElement("script");
        scriptCollector.async = true;
        scriptCollector.src = "https://js.braintreegateway.com/web/3.55.0/js/data-collector.min.js";
        scriptCollector.onload = (e) => {
            this.initializeVenmoCheckout()
        }
        this.buttonRef.current.appendChild(scriptCollector);

        VenmoButton.isScriptsLoaded = true
    }

    initializeVenmoCheckout()
    {
        BraintreePaymentSDK.createClient({
            onCreate: this.createVenmoCheckout.bind(this),
            onError: (clientError) => {
                console.log("BraintreePaymentSDK.clientError", clientError)
            }
        })
    }

    createVenmoCheckout(clientInstance)
    {
        const { allowNewBrowserTab } = this.props

        venmo.create({
            client: clientInstance,
            // Add allowNewBrowserTab: false if your checkout page does not support
            // relaunching in a new tab when returning from the Venmo app. This can
            // be omitted otherwise.
            allowNewBrowserTab: allowNewBrowserTab
        })
        .then((venmoInstance) =>
        {
            // Set up Venmo
            //console.log("venmoInstance created", venmoInstance)
            this._venmoInstance = venmoInstance

            // Verify browser support before proceeding.
            if (!this._venmoInstance.isBrowserSupported()) 
            {
                //console.log('Browser does not support Venmo');
                this.initializeVenmoCheckoutComplete()
                return;
            }
            
            if (allowNewBrowserTab)
            {
                // Check if tokenization results already exist. This occurs when your
                // checkout page is relaunched in a new tab. This step can be omitted
                // if allowNewBrowserTab is false.
                if (this._venmoInstance.hasTokenizationResult()) 
                {
                    console.error('Check if tokenization results already exist', allowNewBrowserTab);
                    // _this._venmoInstance.tokenize().then(handleVenmoSuccess).catch(handleVenmoError);
                }
            }

            this.initializeVenmoCheckoutComplete()
        })
        .catch((venmoErr) =>
        {
            // Handle component creation error
            this.onVenmoError(venmoErr)
        });
    }

    initializeVenmoCheckoutComplete()
    {
        this.buttonRef.current.removeAttribute('disabled');
    }

    handleClick = (e) => 
    {
        this.buttonRef.current.setAttribute('disabled', 'true');

        this._venmoInstance.tokenize().then(payload =>
        {
            this.sendPaymentInfo(payload.nonce)
        })
        .catch(err => 
        {
            if (err.code === 'VENMO_CANCELED') 
            {
                this.onVenmoCanceled(err)
            } 
            else if (err.code === 'VENMO_APP_CANCELED') 
            {
                this.onVenmoCanceled(err)
            } 
            else 
            {
                this.onVenmoError(err)
            }

        })
        .then(() => 
        {
            // this.buttonRef.current.removeAttribute('disabled');
        })
    }

    sendPaymentInfo(payloadNonce)
    {
        const { cartTotal:totalPrice } = this.props

        BraintreePaymentSDK.sendPaymentInfo({
            payloadNonce, 
            totalPrice,
            onApproved: this.onVenmoApproved.bind(this),
            onError: this.onVenmoError.bind(this)
        })
    }
    
    onVenmoApproved(payload)
    {
        console.log("onVenmoApproved().payload", payload)

        const { onTransactionResult } = this.props

        onTransactionResult && onTransactionResult({
            result: TransactionResult.APPROVED,
            data: payload,
            orderTitle: "Thank you for your order!",
            orderMessage: null,
            orderButtonLabel: "Continue"
        })
    }

    onVenmoCanceled(data)
    {
        console.log("onVenmoCanceled().data", data)

        const { onTransactionResult } = this.props

        onTransactionResult && onTransactionResult({
            result: TransactionResult.CANCELED,
            data: data, 
            orderTitle: "Venmo Canceled",
            orderMessage: data.message,
            orderButtonLabel: "Return to Checkout"
        })
    }

    onVenmoError(venmoErr)
    {
        console.log("onVenmoError().err", venmoErr)

        const { onTransactionResult } = this.props
        
        onTransactionResult && onTransactionResult({
            result: TransactionResult.ERROR,
            data: venmoErr,
            orderTitle: null,
            orderMessage: venmoErr.message,
            orderButtonLabel: "Return to Checkout"
        })
    }
} 