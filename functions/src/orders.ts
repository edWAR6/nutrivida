import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}

const products = admin.firestore().collection('products');
const orders = admin.firestore().collection('orders');

function addToCart(parameters) {
  return new Promise((resolve, reject) => {
    const lines = [];
    for (let i in parameters.product) {
      lines.push({
        date: new Date("December 10, 1815"),
        quantity: parameters.quantity[i],
        product: parameters.product[i]
      });
    }
    console.log('LINES', lines);
    orders.add(lines).then((reference) => {
      resolve({
        fulfillmentMessages: [{
          'platform': 'ACTIONS_ON_GOOGLE',
          'simple_responses': {
            'simple_responses': [
              {
                'text_to_speech': `Agregado, ¿Desea pedir algo más?`,
                'display_text': `Agregado, ¿Desea pedir algo más?`
              }
            ]
          }
        }],
        fulfillmentText: `Agregado, ¿Desea pedir algo más?`
      });
    }).catch(function(error) {
      reject(error);
    });
  });
}

function getCart() {
  
}

export {addToCart, getCart}
