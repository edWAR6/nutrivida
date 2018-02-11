"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}
const products = admin.firestore().collection('products');
function getPrice(name) {
    return new Promise((resolve, reject) => {
        products.doc(name).get().then(document => {
            console.log(document);
            if (document.exists) {
                resolve({
                    fulfillmentMessages: [{
                            'platform': 'ACTIONS_ON_GOOGLE',
                            'simple_responses': {
                                'simple_responses': [
                                    {
                                        'text_to_speech': `${document.data().consumerPrice} colones`,
                                        'display_text': `₡${document.data().consumerPrice}`
                                    }
                                ]
                            }
                        }],
                    fulfillmentText: `₡${document.data().consumerPrice}` // displayed response
                });
            }
            else {
                resolve({
                    fulfillmentText: 'Hmm, no se el precio de ese producto, pero me voy a asegurar de averguarlo pronto.'
                });
            }
        }).catch(error => {
            console.log('Error getting documents', error);
            reject(error);
        });
    });
}
exports.getPrice = getPrice;
//# sourceMappingURL=price.js.map