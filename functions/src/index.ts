import * as functions from 'firebase-functions';
import * as Information from './actions/information';
import {addToCart, getCart} from './actions/orders';
import {saveMessage} from './actions/message';
import {getPrices} from './actions/price';

export const nutrividaFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  if (request.body.queryResult) {
    processRequest(request, response);
  } else {
    console.log('Error: Invalid Request');
    return response.status(400).end('Invalid Webhook Request (expecting v2 webhook request)');
  }
});

function processRequest(request, response){
  const action = (request.body.queryResult.action) ? request.body.queryResult.action : 'default';
  const parameters = request.body.queryResult.parameters || [];
  const inputContexts = request.body.queryResult.contexts;
  const requestSource = (request.body.originalDetectIntentRequest) ? request.body.originalDetectIntentRequest.source : undefined;
  const session = (request.body.session) ? request.body.session : undefined;
  const queryText = request.body.queryResult.queryText || '';

  saveMessage(action, queryText).then(() => {
    filterAction();
  }).catch(error => {
    console.log(`Error adding a message: ${error}`);
  });

  function filterAction() {
    switch(action) {
      case 'askForInformation': {
        Information.getInformation(parameters).then(responseToUser => {
          sendResponse(responseToUser);
        });
        break;
      }
      case 'askForPrice': {
        getPrices(parameters.products).then(responseToUser => {
          console.log('Response to Dialogflow: ' + JSON.stringify(responseToUser));
          response.json(responseToUser);
        })
        break;
      }
      case 'makeAnOrder': {
        addToCart(parameters).then(responseToUser => {
          sendResponse(responseToUser);
        });
        break;
      } 
      default: {
        const responseToUser = {
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
  }

  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      const responseJson = {fulfillmentText: responseToUser}; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      const responseJson = {fulfillmentText: null, fulfillmentMessages: null, outputContexts: null};
      // Define the text response
      if (responseToUser.fulfillmentText) {
        responseJson.fulfillmentText = responseToUser.fulfillmentText;
      }
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
