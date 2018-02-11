"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}
const messagesReference = admin.firestore().collection('messages');
function addMessage(action, message) {
    return new Promise((resolve, reject) => {
        messagesReference.add({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            action: action,
            message: message
        }).then(function (docRef) {
            resolve();
        })
            .catch(function (error) {
            console.error("Error saving message: ", error);
            reject(error);
        });
    });
}
exports.addMessage = addMessage;
//# sourceMappingURL=messages.js.map