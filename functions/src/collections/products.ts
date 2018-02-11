import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}

const productsReference = admin.firestore().collection('products');

function getProductByName(name: string) {
  return new Promise((resolve, reject) => {
    productsReference.doc(name).get().then(document => {
      if (document.exists) {
        resolve(document.data());
      } else {
        resolve();
      }
    }).catch(error => {
      console.error('Error executing product.getByName', error);
      reject(error);
    });
  });
}

export {getProductByName};
