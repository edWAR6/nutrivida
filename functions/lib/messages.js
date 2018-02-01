"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}
const messages = admin.firestore().collection('messages');
function addMessage(action, message) {
    return new Promise((resolve, reject) => {
        messages.add({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            action: action,
            message: message
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            resolve();
        })
            .catch(function (error) {
            console.error("Error adding document: ", error);
            reject(error);
        });
    });
}
exports.addMessage = addMessage;
//# sourceMappingURL=messages.js.map