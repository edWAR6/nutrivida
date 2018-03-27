"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}
const subjectsReference = admin.firestore().collection('subjects');
function getById(id) {
    return new Promise((resolve, reject) => {
        subjectsReference.doc(id).get().then(document => {
            if (document.exists) {
                resolve(document.data());
            }
            else {
                resolve({ notFound: true, id });
            }
        }).catch(error => {
            console.error('Error executing subject.getById', error);
            reject(error);
        });
    });
}
exports.getById = getById;
//# sourceMappingURL=subjects.js.map