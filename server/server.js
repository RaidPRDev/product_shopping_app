const express = require('express');
const path = require('path');
const app = express();

// setup braintree
const braintree = require("braintree");
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "",
  publicKey: "",
  privateKey: ""
});

// setup routes
const buildPath = "../build"
const indexRoot = "index.html"

app.use(express.static(path.join(__dirname, buildPath)));
app.use(express.json());

app.get('/cart', function(req, res) 
{
  res.sendFile(path.join(__dirname, buildPath, indexRoot));
});
app.get('/checkout', function(req, res) 
{
  res.sendFile(path.join(__dirname, buildPath, indexRoot));
});
app.get('/', function(req, res) 
{
  res.sendFile(path.join(__dirname, buildPath, indexRoot));
});

app.listen(5000);


// braintree 
// Send a client token to your client
app.get("/client_token", function (req, res) 
{
  gateway.clientToken.generate({}, function (err, response) 
  {
    res.send(response.clientToken);
  });
});

// Receive a payment method nonce from your client
app.post("/process_payment", function (req, res) 
{
  // console.log("res.body************", req.body)
  var nonceFromTheClient = req.body.payment_method_nonce;
  var totalCost = req.body.payment_cost;

  // Use payment method nonce here
  gateway.transaction.sale(
  {
    amount: totalCost,
    paymentMethodNonce: nonceFromTheClient,
    options: {}
    }, function (err, result) {
      res.send({result: result, error: err});
    });
});
