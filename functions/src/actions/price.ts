
import { Response } from './../webhook/response';
import { Message, Platform } from './../webhook/message';
import { SimpleResponses, SimpleResponse } from './../webhook/simpleResponse';
import { getProductByName } from './../collections/products';
import { formatList } from '../tools/stringFormat';

function getPrices(productNames) {
  return new Promise((resolve, reject) => {
    const promises: Array<Promise<any>> = [];
    productNames.forEach(name => {
      promises.push(getProductByName(name));
    });
    Promise.all(promises).then(products => {
      let speech = '';
      let text = '';
      products.forEach(product => {
        speech += `, ${product.consumerPrice} colones`;
        text += `, ${product.name}: ₡${product.consumerPrice}`;
      });
      const response: Response = new Response(
        formatList(text),
        [new Message(
          Platform.google,
          new SimpleResponses([new SimpleResponse(
            formatList(speech),
            formatList(text)
          )])
        )]
      );
      resolve(response);
    });
  });
}

export {getPrices};

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
