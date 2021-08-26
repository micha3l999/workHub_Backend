const paypal = require('@paypal/checkout-server-sdk');

let clientId = "AeE_P6B4NGEP2exjmZtRgmoXg7FABcBzHR48yXpJ8QqMLQ3NrioDSz13x6L411Qnr4UnDqwNiy0j2aNo";
let clientSecret = "EC8uY3A5z-yKxyPkkMQXk5hf7NGdPl-Po_KvzppoTYPA5q9Ja-E4I8OXORpRwKA1-jIw-K1QuYnTxggm";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

const debug = true;


function buildRequestBody(serviceName, servicePrice, serviceCategoryName) {
  return {
      "intent": "CAPTURE",
      "application_context": {
          "return_url": "https://work-hub-backend.herokuapp.com/api/paypal/success",
          "cancel_url": "https://www.example.com",
          "brand_name": "Pago del servicio",
          "locale": "es-EC",
          "landing_page": "BILLING",
          "user_action": "CONTINUE"
      },
      "purchase_units": [
          {
              "reference_id": "PUHF",
              "description": serviceName,
              "custom_id": serviceName,
              "soft_descriptor": "PAGO_DE_SERVICIO",
              "amount": {
                  "currency_code": "USD",
                  "value": servicePrice,
                  "breakdown": {
                    "item_total": {
                        "currency_code": "USD",
                        "value": servicePrice,
                    },
                  }
              },
              "items": [
                {
                    "name": serviceName,
                    "description": serviceCategoryName,
                    "sku": "01",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": servicePrice,
                    },
                    "quantity": "1",
                    "category": "PHYSICAL_GOODS",
                },
              ]
          }
      ]
  };
}


const createPaymentPaypal = async (req, res) => {

  try {
    const serviceName = req.query.serviceName;
    const servicePrice = req.query.servicePrice;
    const serviceCategoryName = req.query.serviceCategoryName;
    const request = new paypal.orders.OrdersCreateRequest();

    request.headers["prefer"] = "return=representation";
    request.requestBody(buildRequestBody(serviceName, servicePrice, serviceCategoryName));
    const response = await client.execute(request);
    if (debug){
        /*console.log("Status Code: " + response.statusCode);
        console.log("Status: " + response.result.status);
        console.log("Order ID: " + response.result.id);
        console.log("Intent: " + response.result.intent);
        console.log("Links: ");
        response.result.links.forEach((item, index) => {
            let rel = item.rel;
            let href = item.href;
            let method = item.method;
            let message = `\t${rel}: ${href}\tCall Type: ${method}`;
            console.log(message);
        });*/
        console.log(`Gross Amount: ${response.result.purchase_units[0].amount.currency_code} ${response.result.purchase_units[0].amount.value}`);
        // To toggle print the whole body comment/uncomment the below line
        //console.log(JSON.stringify(response.result, null, 4));
    }

    console.log("Creating Order...");

    if (response.statusCode === 201){
      console.log("Created Successfully");
      orderId = response.result.id;
      /*console.log("Links:");
      response.result.links.forEach((item, index) => {
          let rel = item.rel;
          let href = item.href;
          let method = item.method;
          let message = `\t${rel}: ${href}\tCall Type: ${method}`;
          console.log(message);
          if (item.rel == "approve") {
            res.redirect(item.href);
          }
      });*/
    }

    /*// Construct a request object and set desired parameters
    // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody(buildRequestBody());

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Order: ${JSON.stringify(response.result)}`);
    res.status(200).json(response);*/

  } catch (error) {
    res.status(500).json({ error: error, message: "SERVER_ERROR" });
    logger.error( error );
  }

}

const captureOrder = async (req, res) => {

  try {
    const orderId = req.query.token;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await client.execute(request);
    if (debug){
        /*console.log("Status Code: " + response.statusCode);
        console.log("Status: " + response.result.status);
        console.log("Capture ID: " + response.result.id);
        console.log("Links:");
        response.result.links.forEach((item, index) => {
            let rel = item.rel;
            let href = item.href;
            let method = item.method;
            let message = `\t${rel}: ${href}\tCall Type: ${method}`;
            console.log(message);
        });*/
        // To toggle print the whole body comment/uncomment the below line
        console.log(JSON.stringify(response.result, null, 4));
    }

    let captureId = "";
    if (response.statusCode === 201){
        captureId = response.result.id;
        /*console.log("Status Code: " + response.statusCode);
        console.log("Status: " + response.result.status);
        console.log("Capture ID: " + response.result.id);
        console.log("Links: ");
        response.result.links.forEach((item, index) => {
            let rel = item.rel;
            let href = item.href;
            let method = item.method;
            let message = `\t${rel}: ${href}\tCall Type: ${method}`;
            console.log(message);
        });*/
        console.log("Captured Successfully\n");
        res.status(200);
    }

    res.status(400);

    /*const orderId = req.query.orderId;
    request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);

    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Capture: ${JSON.stringify(response.result)}`);

    res.status(200).json(response);*/

  } catch (error) {
    res.status(500).json({ error: error, message: "SERVER_ERROR" });
    logger.error( error);
  }

}

const authorizeOrder = async (req, res) => {
  try {
      const orderId = req.query.orderId;
      const debug = true;

      const request = new paypal.orders.OrdersAuthorizeRequest(orderId);
      request.requestBody({});
      const response = await client.execute(request);
      if (debug){
          console.log("Status Code: " + response.statusCode);
          console.log("Status: " + response.result.status);
          console.log('Authorization ID: ', response.result.purchase_units[0].payments.authorizations[0].id);
          console.log("Order ID: " + response.result.id);
          console.log("Links: ");
          response.result.links.forEach((item, index) => {
              let rel = item.rel;
              let href = item.href;
              let method = item.method;
              let message = `\t${rel}: ${href}\tCall Type: ${method}`;
              console.log(message);
          });
          console.log("Authorization Links:");
          response.result.purchase_units[0].payments.authorizations[0].links.forEach((item, index) => {
              let rel = item.rel;
              let href = item.href;
              let method = item.method;
              let message = `\t${rel}: ${href}\tCall Type: ${method}`;
              console.log(message);
          });
          // To toggle print the whole body comment/uncomment the below line
          console.log(JSON.stringify(response.result, null, 4));
      }
      res.status(200).json(response);
  }
  catch (e) {
      console.log(e)
  }
}

module.exports = {
  createPaymentPaypal,
  captureOrder,
  authorizeOrder,
}