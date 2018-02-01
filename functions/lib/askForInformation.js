"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}
const products = admin.firestore().collection('products');
const definitions = admin.firestore().collection('definitions');
const newproducts = admin.firestore().collection('newproducts');
const getInformation = function (parameters) {
    if (parameters.subject === 'Precio') {
        return getPrice(parameters.product);
    }
    else if (parameters.subject === 'MANU' || parameters.subject === 'Nutrivida') {
        return about(parameters.subject);
    }
    else {
        return null;
    }
};
exports.getInformation = getInformation;
function getPrice(name) {
    return new Promise((resolve, reject) => {
        products.doc(name).get().then(document => {
            console.log(`document ${document}`);
            if (document.exists) {
                resolve({
                    fulfillmentMessages: [{
                            'platform': 'ACTIONS_ON_GOOGLE',
                            'simple_responses': {
                                'simple_responses': [
                                    {
                                        'text_to_speech': `${document.data().consumerPrice} colones, ¿cuántos desea pedir?`,
                                        'display_text': `₡${document.data().consumerPrice}`
                                    }
                                ]
                            }
                        }],
                    fulfillmentText: `₡${document.data().consumerPrice}` // displayed response
                });
            }
        }).catch(error => {
            console.log('Error getting documents', error);
            reject(error);
        });
    });
}
// function getPrice(name) {
//   return new Promise((resolve, reject) => {
//     newproducts.get().then(snapshot => {
//       snapshot.forEach(document => {
//         products.doc(document.data().name).set(
//           {...document.data()}
//         );
//       });
//     });
//   });
// }
function about(subject) {
    return new Promise((resolve, reject) => {
        definitions.doc(subject).get().then(document => {
            if (!document.exists) {
                resolve({
                    fulfillmentMessages: [{
                            'platform': 'ACTIONS_ON_GOOGLE',
                            'simple_responses': {
                                'simple_responses': [
                                    {
                                        'text_to_speech': `Disculpe, pero aun no se esta definición, pero el gran equipo de trabajo detrás de este Bot se encargará de enseñarme.`,
                                        'display_text': `No se esa definición 🙄`
                                    }
                                ]
                            }
                        }],
                    fulfillmentText: `Disculpe, aun no se esa definición 🙄`
                });
            }
            else {
                resolve({
                    fulfillmentMessages: [{
                            'platform': 'ACTIONS_ON_GOOGLE',
                            'simple_responses': {
                                'simple_responses': [
                                    {
                                        'text_to_speech': `${document.data().description}`,
                                        'display_text': `${document.data().name}`
                                    }
                                ]
                            }
                        },
                        {
                            'platform': 'ACTIONS_ON_GOOGLE',
                            'basic_card': {
                                'title': `${document.data().name}`,
                                'subtitle': `${document.data().shortDescription}`,
                                'formatted_text': `${document.data().description}`,
                                'image': {
                                    'image_uri': `${document.data().image}`
                                },
                                'buttons': [
                                    {
                                        'title': '¿Qué hacemos?',
                                        'open_uri_action': {
                                            'uri': `${document.data().url}`
                                        }
                                    }
                                ]
                            }
                        }],
                    fulfillmentText: `${document.data().description}`
                });
            }
        }).catch(error => {
            console.log('Error getting document', error);
            reject(error);
        });
    });
}
//# sourceMappingURL=askForInformation.js.map