import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}

const messagesReference = admin.firestore().collection('messages');

function addMessage(action: string, message: string) {
  return new Promise((resolve, reject) => {
    messagesReference.add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      action: action,
      message: message
    }).then(function(docRef) {
      resolve();
    })
    .catch(function(error) {
      console.error("Error saving message: ", error);
      reject(error);
    });
  });
}

export {addMessage};
