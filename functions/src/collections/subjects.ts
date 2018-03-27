import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}

const subjectsReference = admin.firestore().collection('subjects');

function getById(id: string) {
  return new Promise((resolve, reject) => {
    subjectsReference.doc(id).get().then(document => {
      if (document.exists) {
        resolve(document.data());
      } else {
        resolve({notFound: true, id});
      }
    }).catch(error => {
      console.error('Error executing subject.getById', error);
      reject(error);
    });
  });
}

export {getById};
