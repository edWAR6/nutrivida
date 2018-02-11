"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./../webhook/response");
const message_1 = require("./../webhook/message");
const simpleResponse_1 = require("./../webhook/simpleResponse");
const products_1 = require("./../collections/products");
const stringFormat_1 = require("../tools/stringFormat");
function getPrices(productNames) {
    return new Promise((resolve, reject) => {
        const promises = [];
        productNames.forEach(name => {
            promises.push(products_1.getProductByName(name));
        });
        Promise.all(promises).then(products => {
            let speech = '';
            let text = '';
            products.forEach(product => {
                speech += `, ${product.consumerPrice} colones`;
                text += `, ${product.name}: ₡${product.consumerPrice}`;
            });
            const response = new response_1.Response(stringFormat_1.formatList(text), [new message_1.Message(message_1.Platform.google, new simpleResponse_1.SimpleResponses([new simpleResponse_1.SimpleResponse(stringFormat_1.formatList(speech), stringFormat_1.formatList(text))]))]);
            resolve(response);
        });
    });
}
exports.getPrices = getPrices;
// {
//   fulfillmentMessages: [{
//     'platform': 'ACTIONS_ON_GOOGLE',
//     'simple_responses': {
//       'simple_responses': [
//         {
//           'text_to_speech': `${document.data().consumerPrice} colones`,
//           'display_text': `₡${document.data().consumerPrice}`
//         }
//       ]
//     }
//   }],
//   fulfillmentText: `₡${document.data().consumerPrice}` // displayed response
// }
// {
//   fulfillmentText: 'Hmm, no se el precio de ese producto, pero me voy a asegurar de averguarlo pronto.'
// }
//# sourceMappingURL=price.js.map