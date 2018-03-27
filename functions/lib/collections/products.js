"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp(functions.config().firebase);
}
const productsReference = admin.firestore().collection('products');
function getProductByName(name) {
    return new Promise((resolve, reject) => {
        productsReference.doc(name).get().then(document => {
            if (document.exists) {
                resolve(document.data());
            }
            else {
                resolve({ notFound: true, name });
            }
        }).catch(error => {
            console.error('Error executing product.getByName', error);
            reject(error);
        });
    });
}
exports.getProductByName = getProductByName;
//# sourceMappingURL=products.js.map