import { client } from "braintree-web"
import axios from "axios"

export default class BraintreePaymentSDK 
{
    static sandboxKey = "sandbox_bnwn4j5y_yqmk58mq4h9g54gt"
    static clientInstance = null

    static createClient(params)
    {
        const { onCreate, onError } = params

        if (BraintreePaymentSDK.clientInstance !== null)
        {
            onCreate && onCreate(BraintreePaymentSDK.clientInstance)
            return
        }

        console.log("%cBraintree client created: " + client.VERSION, "color:yellow")
        
        client.create({authorization: BraintreePaymentSDK.sandboxKey})
        .then((clientInstance) =>
        {
            BraintreePaymentSDK.clientInstance = clientInstance

            onCreate && onCreate(clientInstance)
        })
        .catch((e) => {
            console.log("BraintreePaymentSDK.ERROR")

            onError && onError(e)
        })
    }

    static sendPaymentInfo(processInfo)
    {
        const { payloadNonce, totalPrice, onApproved, onError } = processInfo

        console.log("BraintreePaymentSDK.sendPaymentInfo", {
            payloadNonce, totalPrice
        })
        
        axios.post("/process_payment", {
            payment_method_nonce: payloadNonce,
            payment_cost: totalPrice
        })
        .then((response) => 
        {
            const { success, message, transaction } = response.data.result
            const { id, processorResponseCode, processorResponseText, processorResponseType } = transaction

            console.log("response", response)
            console.log("result.data", {
                id,
                success,
                message,
                transaction,
                processorResponseCode,
                processorResponseText,
                processorResponseType
            })
          
            if (success)
            {
                onApproved && onApproved(transaction)
            }
            else 
            {
                onError && onError(transaction)
            }
        })
        .catch((err) => 
        {
            console.log("err", err)
            onError && onError(err)
        })
    }

    static getClientToken()
    {
        axios.get("/client_token")
        .then((response) => 
        {
            console.log("response", response)
        })
        .catch((err) => 
        {
            console.log("err", err)
        })
    }
}