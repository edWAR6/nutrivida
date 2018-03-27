
import { Response } from './../webhook/response';
import { Message, Platform } from './../webhook/message';
import { Text } from './../webhook/text';
import { SimpleResponses, SimpleResponse } from './../webhook/simpleResponse';
import { getProductByName } from './../collections/products';
import { formatList } from '../tools/stringFormat';
import { Card } from '../webhook/card';
import { Button } from '../webhook/button';

function getPrices(productNames) {
  return new Promise((resolve, reject) => {
    const promises: Array<Promise<any>> = [];
    productNames.forEach(name => {
      promises.push(getProductByName(name));
    });
    Promise.all(promises).then(products => {
      let speech = '';
      let text = '';
      console.log('products: ', products);
      products.forEach(product => {
        if (!product.notFound) {
          speech += `, ${product.consumerPrice} colones`;
          text += `, ${product.name}: ₡${product.consumerPrice}`;
        }
      });
      const response: Response = new Response(
        formatList(text),
        [new Message(
          Platform.unspecified,
          new Text([formatList(text)]),
        ),
        new Message(
          Platform.google,
          undefined,
          new SimpleResponses([new SimpleResponse(
            formatList(speech),
            formatList(text),
          )])
        ),
        new Message(
          Platform.facebook,
          new Text([formatList(text)]),
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
