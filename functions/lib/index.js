"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const askForInformation_1 = require("./askForInformation");
const orders_1 = require("./orders");
exports.nutrividaFulfillment = functions.https.onRequest((request, response) => {
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    if (request.body.queryResult) {
        processRequest(request, response);
    }
    else {
        console.log('Invalid Request');
        return response.status(400).end('Invalid Webhook Request (expecting v2 webhook request)');
    }
});
function processRequest(request, response) {
    let action = (request.body.queryResult.action) ? request.body.queryResult.action : 'default';
    let parameters = request.body.queryResult.parameters || {};
    let inputContexts = request.body.queryResult.contexts;
    let requestSource = (request.body.originalDetectIntentRequest) ? request.body.originalDetectIntentRequest.source : undefined;
    let session = (request.body.session) ? request.body.session : undefined;
    switch (action) {
        case 'askForInformation': {
            askForInformation_1.getInformation(parameters).then(responseToUser => {
                sendResponse(responseToUser);
            });
            break;
        }
        case 'makeAnOrder': {
            orders_1.addToCart(parameters).then(responseToUser => {
                sendResponse(responseToUser);
            });
            break;
        }
        default: {
            let responseToUser = {
                fulfillmentMessages: [{
                        'platform': 'ACTIONS_ON_GOOGLE',
                        'simple_responses': {
                            'simple_responses': [
                                {
                                    'text_to_speech': '¡Recuerde que puedo responderle preguntas y venderle los productos de Nutrivida y Florida Bebidas!',
                                    'display_text': '¡Recuerde que puedo responderle preguntas y venderle los productos de Nutrivida y Florida Bebidas! 🥣🍹'
                                }
                            ]
                        }
                    }],
                fulfillmentText: '¡Recuerde que puedo responderle preguntas y venderle los productos de Nutrivida y Florida Bebidas! 🥣🍹' // displayed response
            };
            sendResponse(responseToUser);
            break;
        }
    }
    function sendResponse(responseToUser) {
        // if the response is a string send it as a response to the user
        if (typeof responseToUser === 'string') {
            let responseJson = { fulfillmentText: responseToUser }; // displayed response
            response.json(responseJson); // Send response to Dialogflow
        }
        else {
            // If the response to the user includes rich responses or contexts send them to Dialogflow
            let responseJson = { fulfillmentText: null, fulfillmentMessages: null, outputContexts: null };
            // Define the text response
            responseJson.fulfillmentText = responseToUser.fulfillmentText;
            // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
            if (responseToUser.fulfillmentMessages) {
                responseJson.fulfillmentMessages = responseToUser.fulfillmentMessages;
            }
            // Optional: add contexts (https://dialogflow.com/docs/contexts)
            if (responseToUser.outputContexts) {
                responseJson.outputContexts = responseToUser.outputContexts;
            }
            // Send the response to Dialogflow
            console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
            response.json(responseJson);
        }
    }
}
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
// export const addMessage = functions.https.onRequest((request, response) => {
//   // Grab the text parameter.
//   const original = request.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   admin.firestore().collection('messages').add({original: original}).then(writeResult => {
//     // Send back a message that we've succesfully written the message
//     response.json({result: `Message with ID: ${writeResult.id} added.`});
//     return;
//   }).catch (error => {
//     console.log(error);
//   });
// }); 
//# sourceMappingURL=index.js.map